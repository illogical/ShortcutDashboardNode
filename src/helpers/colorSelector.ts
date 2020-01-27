import { ITheme } from "../models/theme";
import classyPink from "../styles/themes/classyPink.module.css";
import deepPurple from "../styles/themes/deepPurple.module.css";
import flat from "../styles/themes/flat.module.css";
import flexible from "../styles/themes/flexible.module.css";
import { ISettings } from "../models/settings";
import faker from "faker";

export const getRandomBorderColor = (settings: ISettings) => {
  return settings.colors.buttons[
    faker.random.number({ min: 0, max: settings.colors.buttons.length - 1 })
  ];
};

export const getColorByIndex = (index: number, settings: ISettings) => {
  return settings.colors.buttons[index % settings.colors.buttons.length];
};

export const getTheme = () => {
  const themeIndex = 0;
  const selectedTheme = { ...themes[themeIndex] };

  return selectedTheme;
};

const themes: ITheme[] = [
  {
    backgroundClass: flexible.background,
    buttonClass: flexible.button,
    buttonHoverClass: flexible.buttonhover,
    overrideBorderColor: true
  },
  {
    backgroundClass: classyPink.background,
    buttonClass: classyPink.button,
    buttonHoverClass: classyPink.buttonhover
  },
  {
    backgroundClass: deepPurple.background,
    buttonClass: deepPurple.button,
    buttonHoverClass: deepPurple.buttonhover
  },
  {
    backgroundClass: flat.background,
    buttonClass: flat.button,
    buttonHoverClass: flat.buttonhover
  }
];
