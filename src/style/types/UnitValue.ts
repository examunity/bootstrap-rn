import { PixelRatio } from 'react-native';

const valueRE = /^([+-]?(?:\d+|\d*\.\d+))(rem|px|%)?$/;

export default class UnitValue {
  value;

  unit;

  constructor(value: number, unit: string = 'number') {
    this.value = value;
    this.unit = unit;
  }

  static parse(value: UnitValue | number | string) {
    if (value instanceof UnitValue) {
      return value;
    }

    if (typeof value === 'number') {
      return new UnitValue(value, 'number');
    }

    const match = value.match(valueRE);

    if (!match) {
      throw new Error(`Cannot parse number "${value}".`);
    }

    return new UnitValue(
      parseFloat(match[1]),
      match[2] === '%' ? 'percent' : match[2],
    );
  }

  toNumber() {
    if (this.unit === 'percent') {
      return this.value / 100;
    }

    if (this.unit === 'rem') {
      return this.value * PixelRatio.getFontScale() * 16;
    }

    return this.value;
  }

  toString() {
    if (this.unit === 'number') {
      return `${this.value}`;
    }

    if (this.unit === 'percent') {
      return `${this.value}%`;
    }

    return `${this.value}${this.unit}`;
  }
}
