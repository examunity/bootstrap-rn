import { PixelRatio } from 'react-native';

const valueRE = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;

const parseValue = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'number') {
    return [value, null];
  }

  const matchedValue = value.match(valueRE);

  if (matchedValue) {
    return [parseFloat(value), matchedValue[2]];
  }

  return [value, undefined];
};

const getUnit = (left, right) => {
  if (!left && !right) {
    return '';
  }

  if (!left) {
    return right;
  }

  if (!right || left === right) {
    return left;
  }

  throw new Error(
    `Different units ${left} and ${right} found for arithmetic operation.`,
  );
};

const POWER = 10 ** 8;

const fixRounding = (value) => Math.round(value * POWER) / POWER;

const calculateValue = (leftValue, operator, rightValue) => {
  if (operator === '+') {
    return leftValue + rightValue;
  }

  if (operator === '-') {
    return leftValue - rightValue;
  }

  if (operator === '*') {
    return fixRounding(leftValue * rightValue);
  }

  if (operator === '/') {
    return fixRounding(leftValue / rightValue);
  }

  if (operator === '%') {
    return leftValue % rightValue;
  }

  throw new Error('Unknown operator.');
};

export function calculate(left, operator, right) {
  const [leftValue, leftUnit] = parseValue(left);
  const [rightValue, rightUnit] = parseValue(right);
  const unit = getUnit(leftUnit, rightUnit);

  return `${calculateValue(leftValue, operator, rightValue)}${unit}`;
}

const convertToREM = (value) => {
  const remValue = value / (PixelRatio.getFontScale() * 16);

  return [remValue, 'rem'];
};

// Use calculateAdvanced for mixed px/rem units.
export function calculateAdvanced(left, operator, right) {
  const parsedLeft = parseValue(left);
  const [leftValue, leftUnit] = parsedLeft;
  const parsedRight = parseValue(right);
  const [rightValue, rightUnit] = parsedRight;

  if (leftUnit === 'px' && rightUnit === 'rem') {
    return calculate(convertToREM(leftValue), operator, parsedRight);
  }

  if (leftUnit === 'rem' && rightUnit === 'px') {
    return calculate(parsedLeft, operator, convertToREM(rightValue));
  }

  return calculate(parsedLeft, operator, parsedRight);
}
