import { IConfigFile } from "../models/configFile";
import { ISettings } from "../models/settings";

export const remapConfig = (settings: ISettings): IConfigFile => {
  // rearrange data for first save
  // TODO: colors should have IDs
  let id = 0;
  return {
    buttons: settings.keymap.buttons.map((button) => {
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
    settings: {
      ...settings,
      colors: {
        ...settings.colors,
        options: settings.colors.buttons.map((color) => {
          return {
            name: color,
            id: id++,
          };
        }),
      },
    },
    system: {
      lastId: id - 1, // does this work?
    },
  };
};

// TODO: remap function for swapping IConfigFile to another IConfigFile but set relationships as IDs instead of strings
