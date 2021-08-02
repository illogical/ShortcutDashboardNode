import lodash from 'lodash';
import { IConfig } from '../models/config';
import { ISettings } from '../models/settings';
import { IEntity } from '../models/entity';
import { Area } from '../models/enums';
import { IButtonInfo } from '../models/buttonInfo';

export const remapConfig = (config: IConfig) => mapRelationships(config);

export const remapSettingsToConfig = (settings: ISettings): IConfig => {
    // rearrange data for first save
    // TODO: don't save the colors (programmatic)
    let id = 0;
    return remapToUseIds({
        buttons: settings.buttons.map((button) => {
            return {
                ...button,
                id: id++,
            };
        }),
        apps: settings.applications.map((app) => {
            return {
                name: app,
                id: id++,
            };
        }),
        // areas: settings.areas.map((area) => {
        //   return {
        //     name: area,
        //     id: id++,
        //   };
        // }),
        areas: settings.areas,
        groups: settings.groups.map((group) => {
            return {
                ...group,
                id: id++,
            };
        }),
        filters: settings.filters.map((filter) => {
            return {
                name: filter,
                id: id++,
            };
        }),
        settings,
        // settings: {
        //   ...settings,
        //   colors: {
        //     ...settings.colors,
        //     options: settings.colors.buttons,
        //   },
        // },
        system: {
            lastId: id - 1,
        },
    });
};

// TODO: remap function for swapping IConfigFile to another IConfigFile but set relationships as IDs instead of strings
const remapToUseIds = (config: IConfig): IConfig =>
    mapRelationships({
        ...config,
        buttons: config.buttons.map((button) => {
            return {
                ...button,
                groupId: lodash.find(config.groups, (g) => g.tag === button.group)?.id,
                appId: lodash.find(config.apps, (a) => a.name === button.app)?.id,
                filterIds: getFilterIds(button.tags, config.filters),
            };
        }),
    });

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

        const area = mapAreas(cur.area);

        if (prev[area]) {
            return { ...prev, [area]: [...prev[area], cur.id] };
        }

        return { ...prev, [area]: [cur.id] };
    }, {} as Record<Area, number[]>);

    const buttonsToApp = config.buttons.reduce<Record<number, number[]>>((prev, cur) => {
        if (!cur.appId) {
            return prev;
        }

        if (prev[cur.appId]) {
            return { ...prev, [cur.appId]: [...prev[cur.appId], cur.id] };
        }

        return { ...prev, [cur.appId]: [cur.id] };
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

        const area = mapAreas(cur.area);

        if (prev[area]) {
            return { ...prev, [area]: [...prev[area], cur.id] };
        }

        return { ...prev, [area]: [cur.id] };
    }, {} as Record<Area, number[]>);

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

const mapAreas = (area: string): Area => {
    switch (area) {
        // TODO: how to simplify common vs. main vs. general vs. favorites? Common is just above the main area. Should I simplify?
        case 'common':
        case 'main':
        case 'general':
            return Area.Main;
        case 'top':
            return Area.Top;
        case 'bottom':
        case 'favorites':
            return Area.Bottom;
        default:
            throw new Error(`Unexpected area found: ${area}`);
    }
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
