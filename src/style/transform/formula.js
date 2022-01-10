const transformExpressionRE = /([+-]+)?([\d.Ee]+)(rem|px)?\s*(\+|-|\*|%)\s*([+-]+)?([\d.Ee]+)(rem|px)?/g;

const getNumber = (unary, value) => {
  if (!unary) {
    return value;
  }

  const prefix = (unary.split('-').length - 1) % 2 === 0 ? 1 : -1;

  return prefix * value;
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

const calculate = (left, operator, right) => {
  if (operator === '+') {
    return parseFloat(left) + parseFloat(right);
  }

  if (operator === '-') {
    return parseFloat(left) - parseFloat(right);
  }

  if (operator === '*') {
    return fixRounding(parseFloat(left) * parseFloat(right));
  }

  if (operator === '%') {
    return parseFloat(left) % parseFloat(right);
  }

  throw new Error('Unknown operator.');
};

function formula(value) {
  // Naïve approach to calculate simple formulas.
  // TODO: Support more complex formulas including parenthesis.
  return value.replace(
    transformExpressionRE,
    (_, leftUnary, left, leftUnit, operator, rightUnary, right, rightUnit) => {
      const leftNumber = getNumber(leftUnary, left);
      const rightNumber = getNumber(rightUnary, right);
      const unit = getUnit(leftUnit, rightUnit);
      const result = calculate(leftNumber, operator, rightNumber);

      return `${result}${unit}`;
    },
  );
}

export default formula;
