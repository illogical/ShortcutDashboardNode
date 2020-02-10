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
