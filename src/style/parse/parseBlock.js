import variable from './rules/variable';
import declaration from './rules/declaration';
import directive from './rules/directive';
import selector from './rules/selector';
import comment from './rules/comment';
import isWhitespace from './isWhitespace';

function parseBlock(input) {
  if (isWhitespace(input.peek())) {
    input.charsWhile(isWhitespace);
    return null;
  }

  if (variable.locate(input)) {
    return variable.read(input, parseBlock);
  }

  if (declaration.locate(input)) {
    return declaration.read(input, parseBlock);
  }

  if (selector.locate(input)) {
    return selector.read(input, parseBlock);
  }

  if (directive.locate(input)) {
    return directive.read(input, parseBlock);
  }

  if (comment.locate(input)) {
    return comment.read(input, parseBlock);
  }

  throw new Error(`CSS syntax error: Unknown error at "${input.peek()}"`);
}

export default parseBlock;
