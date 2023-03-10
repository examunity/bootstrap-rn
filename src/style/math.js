import { PixelRatio } from 'react-native';
import UnitValue from './types/UnitValue';

const POWER = 10 ** 8;
const UNIT_ORDER = ['percent', 'number', 'px', 'rem'];

const fixRounding = (value) => Math.round(value * POWER) / POWER;

const normalizeValue = (number1, number2) => {
  if (number1.unit === 'px' && number2.unit === 'rem') {
    return number1.value / (PixelRatio.getFontScale() * 16);
  }

  if (number1.unit === 'percent' && number2.unit !== 'percent') {
    return number1.value / 100;
  }

  return number1.value;
};

const calculateValue = (number1, operator, number2) => {
  const value1 = normalizeValue(number1, number2);
  const value2 = normalizeValue(number2, number1);

  switch (operator) {
    case '+':
      return value1 + value2;
    case '-':
      return value1 - value2;
    case '*':
      return fixRounding(value1 * value2);
    case '/':
      return fixRounding(value1 / value2);
    case '%':
      return value1 % value2;
    default:
      throw new Error('Unknown operator.');
  }
};

const determineUnit = (number1, number2) => {
  const index1 = UNIT_ORDER.indexOf(number1.unit);
  const index2 = UNIT_ORDER.indexOf(number2.unit);

  return index1 > index2 ? number1.unit : number2.unit;
};

export function calculate(value1, operator, value2) {
  const number1 = UnitValue.parse(value1);
  const number2 = UnitValue.parse(value2);

  const value = calculateValue(number1, operator, number2);
  const unit = determineUnit(number1, number2);

  return new UnitValue(value, unit).toString();
}

export function normalizeNumber(value) {
  return UnitValue.parse(value).toNumber();
}
