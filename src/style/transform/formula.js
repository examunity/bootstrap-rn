import { calculate } from '../../math';

const formulaRE = /([+-])?([\d.Ee]+)(rem|px)?\s*(\+|-|\*|%)\s*([+-])?([\d.Ee]+)(rem|px)?/g;

function formula(value) {
  // Naïve approach to calculate simple formulas.
  // TODO: Support more complex formulas including parenthesis.
  return value.replace(
    formulaRE,
    (
      _,
      leftUnary = '',
      leftNumber,
      leftUnit = null,
      operator,
      rightUnary = '',
      rightNumber,
      rightUnit = null,
    ) => {
      const leftValue = [`${leftUnary}${leftNumber}`, leftUnit];
      const rightValue = [`${rightUnary}${rightNumber}`, rightUnit];

      return calculate(leftValue, operator, rightValue);
    },
  );
}

export default formula;
