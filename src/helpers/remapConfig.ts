import lodash from 'lodash';
import { IConfig } from '../models/config';
import { IEntity } from '../models/entity';
import { Area } from '../models/enums';
import { remapAreas } from './remapAreas';
import { IRelationships } from '../models/relationships';
import { toRecord } from './toRecord';
import { IButtonInfo } from '../models/buttonInfo';
import { IGroupInfo } from '../models/groupInfo';

export const remapConfig = (config: IConfig) => auditLayout(mapLayouts(mapRelationships(config)));

//mapRelationships(config);

const auditLayout = (config: IConfig): IConfig => {
    // relationship buttons
    const allButtons = toRecord(config.buttons, (b) => b.id);
    const pinnedButtonIds = Object.values(config.appSettings.pinnedButtonsToArea).flat();
    const relationshipButtons: number[] = [
        ...Object.values(config.relationships.buttonsToArea).flat(),
        ...Object.values(config.relationships.buttonsToGroup).flat(),
        ...pinnedButtonIds,
    ].sort();

    let missingButtons: IButtonInfo[] = [];
    let repeatedButtons: IButtonInfo[] = [];
    config.buttons.forEach((b) => {
        const filter = relationshipButtons.filter((r) => b.id === r);

        if (filter.length === 0) {
            missingButtons.push(allButtons[b.id]);
        }

        if (filter.length > 1) {
            repeatedButtons.push(allButtons[b.id]);
        }
    });

    // layout buttons
    const allLayoutButtons: IButtonInfo[] = [...config.appSettings.pinnedButtons];
    const allLayoutGroups: IGroupInfo[] = [];

    config.layouts?.forEach((l) => {
        allLayoutButtons.push(...l.buttons);
        allLayoutGroups.push(...l.groups);
    });
    const layoutsButtonCount = allLayoutButtons.length;

    let missingLayoutButtons: IButtonInfo[] = [];
    let repeatedLayoutButtons: IButtonInfo[] = [];
    config.buttons.forEach((b) => {
        const filter = allLayoutButtons.filter((l) => b.id === l.id);

        if (filter.length === 0) {
            missingLayoutButtons.push(allButtons[b.id]);
        }

        if (filter.length > 1) {
            repeatedLayoutButtons.push(allButtons[b.id]);
        }
    });

    console.log(`Original buttons count: `, config.buttons.length);
    console.log(`Relationship buttons count: `, relationshipButtons.length);
    if (missingButtons.length > 0) {
        console.log('Missing relationship buttons:', missingButtons);
    }
    if (repeatedButtons.length > 0) {
        console.log('Repeated relationship buttons:', repeatedButtons);
    }
    console.log('Layout buttons count:', layoutsButtonCount);
    if (missingLayoutButtons.length > 0) {
        console.log('Missing layout buttons:', missingLayoutButtons);
    }
    if (repeatedLayoutButtons.length > 0) {
        console.log('Repeated layout buttons:', repeatedLayoutButtons);
    }

    // groups
    const allGroups = toRecord(config.groups, (b) => b.id);
    const relationshipGroups: number[] = [
        ...Object.values(config.relationships.groupsToArea).flat(),
    ].sort();

    let missingGroups: IGroupInfo[] = [];
    let repeatedGroups: IGroupInfo[] = [];
    config.groups.forEach((b) => {
        const filter = relationshipGroups.filter((r) => b.id === r);

        if (filter.length === 0) {
            missingGroups.push(allGroups[b.id]);
        }

        if (filter.length > 1) {
            repeatedGroups.push(allGroups[b.id]);
        }
    });

    console.log(`Original groups count: `, config.groups.length);
    console.log(`Relationship groups count: `, relationshipGroups.length);
    console.log('Layout groups count: ', allLayoutGroups.length);
    if (missingGroups.length > 0) {
        console.log('Missing relationship groups:', missingGroups);
    }
    if (repeatedGroups.length > 0) {
        console.log('Repeated relationship groups:', repeatedGroups);
    }

    return config;
};

const mapLayouts = (config: IConfig): IConfig => {
    return {
        ...config,
        appSettings: {
            ...config.system,
            colors: config.settings.colors,
            pinnedButtons: config.buttons.filter((b) => b.app === 'all'),
            pinnedButtonsToArea: config.buttons.reduce<Record<Area, number[]>>((prev, cur) => {
                // currently the only pinned buttons I wanted were on the top bar
                if (cur.area !== 'top') {
                    return prev;
                }

                if (cur.app !== 'all') {
                    console.error("UNEXPECTED: top button's app not set to all", cur);
                }

                if (prev[Area.Top]) {
                    return { ...prev, [Area.Top]: [...prev[Area.Top], cur.id] };
                }

                return { ...prev, [Area.Top]: [cur.id] };
            }, {} as Record<Area, number[]>),
        },
        system: {
            ...config.system,
            areas: [Area.Top, Area.Main, Area.Common, Area.Bottom], // hard code the available areas
        },
        layouts: config.apps.map((app) => {
            const groupsInApp = config.groups.filter((g) => g.appId === app.id);
            let buttonsFromGroups: IButtonInfo[] = [];
            groupsInApp.forEach((g) => {
                if (g.appId === app.id) {
                    buttonsFromGroups.push(...config.buttons.filter((b) => b.groupId === g.id));
                }
            });

            return {
                name: app.name,
                buttons: [
                    ...config.buttons.filter((b) => b.appId === app.id),
                    ...buttonsFromGroups,
                ],
                groups: groupsInApp,
                relationships: mapRelationshipsPerApp(config, app.id),
            };
        }),
    };
};

const mapRelationshipsPerApp = (config: IConfig, appId: number): IRelationships => {
    return {
        ...config.relationships, // TODO: Kill buttonsToApp, groupsToApp
        buttonsToGroup: config.buttons.reduce<Record<number, number[]>>((prev, cur) => {
            if (!cur.groupId || cur.appId !== appId) {
                return prev;
            }

            if (prev[cur.groupId]) {
                return { ...prev, [cur.groupId]: [...prev[cur.groupId], cur.id] };
            }

            return { ...prev, [cur.groupId]: [cur.id] };
        }, {}),
        buttonsToArea: config.buttons.reduce<Record<Area, number[]>>((prev, cur) => {
            if (!cur.area || cur.appId !== appId) {
                return prev;
            }

            const area = remapAreas(cur.area);

            if (prev[area]) {
                return { ...prev, [area]: [...prev[area], cur.id] };
            }

            return { ...prev, [area]: [cur.id] };
        }, {} as Record<Area, number[]>),
        groupsToArea: config.groups.reduce<Record<Area, number[]>>((prev, cur) => {
            if (!cur.area || cur.appId !== appId) {
                return prev;
            }

            const area = remapAreas(cur.area);

            if (prev[area]) {
                return { ...prev, [area]: [...prev[area], cur.id] };
            }

            return { ...prev, [area]: [cur.id] };
        }, {} as Record<Area, number[]>),
        // TODO: map buttons with app === all to Windows with new 'pin' boolean
        // TODO: add pin bool to buttons and groups
    };
};

const mapRelationships = (config: IConfig): IConfig => {
    const buttonsToGroup = config.buttons.reduce<Record<number, number[]>>((prev, cur) => {
        if (!cur.groupId) {
            return prev;
        }

        if (prev[cur.groupId]) {
            return { ...prev, [cur.groupId]: [...prev[cur.groupId], cur.id] };
        }

        return { ...prev, [cur.groupId]: [cur.id] };
    }, {});

    const buttonsToArea = config.buttons.reduce<Record<Area, number[]>>((prev, cur) => {
        if (!cur.area) {
            return prev;
        }

        const area = remapAreas(cur.area);

        // these got remapped to pinnedButtons
        if (area === Area.Top) {
            return prev;
        }

        if (prev[area]) {
            return { ...prev, [area]: [...prev[area], cur.id] };
        }

        return { ...prev, [area]: [cur.id] };
    }, {} as Record<Area, number[]>);

    const buttonsToApp = config.buttons.reduce<Record<number, number[]>>((prev, cur) => {
        if (cur.app !== 'all' && !cur.appId) {
            return prev;
        }

        const appId = cur.app === 'all' ? -1 : cur.appId ?? -1;

        if (prev[appId]) {
            return { ...prev, [appId]: [...prev[appId], cur.id] };
        }

        return { ...prev, [appId]: [cur.id] };
    }, {});

    const groupsToApp = config.groups.reduce<Record<number, number[]>>((prev, cur) => {
        if (prev[cur.appId]) {
            return { ...prev, [cur.appId]: [...prev[cur.appId], cur.id] };
        }

        return { ...prev, [cur.appId]: [cur.id] };
    }, {});

    const groupsToArea = config.groups.reduce<Record<Area, number[]>>((prev, cur) => {
        if (!cur.area) {
            return prev;
        }

        const area = remapAreas(cur.area);

        if (prev[area]) {
            return { ...prev, [area]: [...prev[area], cur.id] };
        }

        return { ...prev, [area]: [cur.id] };
    }, {} as Record<Area, number[]>);

    // const buttonsToTop = config.buttons.filter((b) => b.area === 'top').map((b) => b.id);

    return {
        ...config,
        relationships: {
            buttonsToGroup,
            buttonsToArea,
            buttonsToApp,
            groupsToApp,
            groupsToArea,
        },
    };
};

const getFilterIds = (tags: string[] | undefined, filters: IEntity[]): number[] | undefined => {
    if (!tags) return undefined;

    let filterIds: number[] = [];
    for (let i = 0; i < tags.length; i++) {
        const filter = lodash.find(filters, (f) => f.name === tags[i]);
        if (filter) {
            filterIds.push(filter.id);
        }
    }

    return filterIds.length > 0 ? filterIds : undefined;
};

// export const remapSettingsToConfig = (settings: ISettings): IConfig => {
//     // rearrange data for first save
//     // TODO: don't save the colors (programmatic)
//     let id = 0;
//     return remapToUseIds({
//         buttons: settings.buttons.map((button) => {
//             return {
//                 ...button,
//                 id: id++,
//             };
//         }),
//         apps: settings.applications.map((app) => {
//             return {
//                 name: app,
//                 id: id++,
//             };
//         }),
//         // areas: settings.areas.map((area) => {
//         //   return {
//         //     name: area,
//         //     id: id++,
//         //   };
//         // }),
//         areas: settings.areas,
//         groups: settings.groups.map((group) => {
//             return {
//                 ...group,
//                 id: id++,
//             };
//         }),
//         filters: settings.filters.map((filter) => {
//             return {
//                 name: filter,
//                 id: id++,
//             };
//         }),
//         settings,
//         // settings: {
//         //   ...settings,
//         //   colors: {
//         //     ...settings.colors,
//         //     options: settings.colors.buttons,
//         //   },
//         // },
//         system: {
//             lastId: id - 1,
//         },
//     });
// };

// TODO: remap function for swapping IConfigFile to another IConfigFile but set relationships as IDs instead of strings
// const remapToUseIds = (config: IConfig): IConfig =>
//     mapRelationships({
//         ...config,
//         buttons: config.buttons.map((button) => {
//             return {
//                 ...button,
//                 groupId: lodash.find(config.groups, (g) => g.tag === button.group)?.id,
//                 appId: lodash.find(config.apps, (a) => a.name === button.app)?.id,
//                 filterIds: getFilterIds(button.tags, config.filters),
//             };
//         }),
//     });
