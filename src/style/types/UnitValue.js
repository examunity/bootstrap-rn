import { PixelRatio } from 'react-native';

const valueRE = /^([+-]?(?:\d+|\d*\.\d+))(rem|px|%)?$/;

export default class UnitValue {
  value;

  unit;

  constructor(value, unit = 'number') {
    this.value = value;
    this.unit = unit;
  }

  static parse(value) {
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

  toPercentage() {
    if (!['number', 'percent'].includes(this.unit)) {
      throw new Error(`Unexpected unit "${this.unit}".`);
    }

    if (this.unit === 'percent') {
      return this.value / 100;
    }

    return this.value;
  }

  toNumber() {
    if (!['number', 'px', 'rem'].includes(this.unit)) {
      throw new Error(`Unexpected unit "${this.unit}".`);
    }

    if (this.unit === 'rem') {
      return this.value * PixelRatio.getFontScale() * 16;
    }

    return this.value;
  }

  toString() {
    return `${this.value}${this.unit === 'number' ? '' : this.unit}`;
  }
}
