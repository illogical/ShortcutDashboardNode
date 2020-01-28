import { ITheme } from "../models/theme";
import classyPink from "../styles/themes/classyPink.module.css";
import deepPurple from "../styles/themes/deepPurple.module.css";
import flat from "../styles/themes/flat.module.css";
import flexible from "../styles/themes/flexible.module.css";
import faker from "faker";

export class ColorSelector {
  colors: string[];
  index: number;

  constructor(colors: string[], startIndex?: number) {
    this.index = startIndex || 0;
    this.colors = colors;
  }

  getColor() {
    const color = this.colors[this.index % this.colors.length];
    this.index++;
    return color;
  }

  getColorByIndex(index: number) {
    return this.colors[index % this.colors.length];
  }

  getRandomColor() {
    return this.colors[
      faker.random.number({ min: 0, max: this.colors.length - 1 })
    ];
  }
}

//TODO: give this a better home
//theme definitions that use CSS modules
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
