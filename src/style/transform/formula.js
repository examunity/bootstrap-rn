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

  throw new Error('Different units found for arithmetic operation.');
};

const calculate = (left, operator, right) => {
  if (operator === '+') {
    return left + right;
  }

  if (operator === '-') {
    return left - right;
  }

  if (operator === '*') {
    return left * right;
  }

  if (operator === '%') {
    return left % right;
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
