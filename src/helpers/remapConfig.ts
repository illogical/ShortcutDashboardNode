import lodash from "lodash";
import { IConfig } from "../models/config";
import { ISettings } from "../models/settings";
import { IEntity } from "../models/entity";

export const remapConfig = (settings: ISettings): IConfig => {
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
    areas: settings.areas.map((area) => {
      return {
        name: area,
        id: id++,
      };
    }),
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
      lastId: id - 1, // does this work?
    },
  });
};

// TODO: remap function for swapping IConfigFile to another IConfigFile but set relationships as IDs instead of strings
const remapToUseIds = (config: IConfig): IConfig => {
  return {
    ...config,
    groups: config.groups.map((group) => {
      return {
        ...group,
        appId: lodash.find(config.apps, (a) => a.name === group.app)?.id,
      };
    }),
    buttons: config.buttons.map((button) => {
      return {
        ...button,
        groupId: lodash.find(config.groups, (g) => g.tag === button.group)?.id,
        appId: lodash.find(config.apps, (a) => a.name === button.app)?.id,
        filterIds: getFilterIds(button.tags, config.filters),
      };
    }),
  };
};

const getFilterIds = (
  tags: string[] | undefined,
  filters: IEntity[]
): number[] | undefined => {
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
