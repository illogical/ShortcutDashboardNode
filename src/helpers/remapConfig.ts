import lodash from 'lodash';
import { IConfig } from '../models/config';
import { ISettings } from '../models/settings';
import { IEntity } from '../models/entity';
import { Area } from '../models/enums';

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
    const buttonsToGroups = config.buttons.reduce((prev, cur) => {
        return { ...prev, [cur.id]: [cur.groupId] };
    }, {});

    const buttonsToAreas = config.buttons.reduce((prev, cur) => {
        if (!cur.area) {
            return prev;
        }
        return { ...prev, [cur.id]: [mapAreas(cur.area)] };
    }, {});

    const buttonsToApps = config.buttons.reduce((prev, cur) => {
        return { ...prev, [cur.id]: [cur.appId] };
    }, {});

    const groupsToArea = config.groups.reduce((prev, cur) => {
        return { ...prev, [cur.id]: [mapAreas(cur.area)] };
    }, {});

    const groupsToApps = config.groups.reduce((prev, cur) => {
        return { ...prev, [cur.id]: [cur.appId] };
    }, {});

    return {
        ...config,
        relationships: {
            buttonsToGroup: buttonsToGroups,
            buttonsToAreas,
            buttonsToApps,
            groupsToArea,
            groupsToApps,
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
