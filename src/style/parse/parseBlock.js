import declaration from './rules/declaration';
// eslint-disable-next-line import/no-cycle
import directive from './rules/directive';
// eslint-disable-next-line import/no-cycle
import selector from './rules/selector';
import comment from './rules/comment';
import isWhitespace from './isWhitespace';

const addCondition = (result) => (item) => {
  if (result[0].conditions[0]) {
    item.conditions.unshift(result[0].conditions[0]);
  }

  return item;
};

function parseBlock(input, result) {
  let nextResult = result;

  if (isWhitespace(input.peek())) {
    input.charsWhile(isWhitespace);
  } else if (declaration.locate(input)) {
    Object.assign(nextResult[0].declarations, declaration.read(input, this));
  } else if (selector.locate(input)) {
    const selectorResult = selector.read(input, this).map(addCondition(result));
    nextResult = [...result, ...selectorResult];
  } else if (directive.locate(input)) {
    const directiveResult = directive
      .read(input, this)
      .map(addCondition(result));
    nextResult = [...result, ...directiveResult];
  } else if (comment.locate(input)) {
    comment.read(input, this);
  } else {
    throw new Error(`CSS syntax error: Unknown error at "${input.peek()}"`);
  }

  return nextResult;
}

export default parseBlock;
