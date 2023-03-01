import { PixelRatio } from 'react-native';
import UnitValue from './types/UnitValue';

const POWER = 10 ** 8;
const fixRounding = (value) => Math.round(value * POWER) / POWER;

const calculateValue = (value1, operator, value2) => {
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

const pxToRem = (value) => value / (PixelRatio.getFontScale() * 16);

export function calculate(value1, operator, value2) {
  const number1 = UnitValue.parse(value1);
  const number2 = UnitValue.parse(value2);

  if (number1.unit === 'px' && number2.unit === 'rem') {
    return `${calculateValue(
      pxToRem(number1.value),
      operator,
      number2.value,
    )}rem`;
  }

  if (number1.unit === 'rem' && number2.unit === 'px') {
    return `${calculateValue(
      number1.value,
      operator,
      pxToRem(number2.value),
    )}rem`;
  }

  const unit = number1.unit === 'number' ? number2.unit : number1.unit;
  return `${calculateValue(number1.value, operator, number2.value)}${
    unit === 'number' ? '' : unit
  }`;
}

export function normalizeNumber(value) {
  return UnitValue.parse(value).toNumber();
}
