import InputStream from './InputStream';
import variable from './rules/variable';
import declaration from './rules/declaration';
import directive from './rules/directive';
import selector from './rules/selector';
import comment from './rules/comment';
import isWhitespace from './isWhitespace';

function parseBlock(input: InputStream) {
  const char = input.peek();

  if (typeof char === 'string' && isWhitespace(char)) {
    input.charsWhile(isWhitespace);
    return null;
  }

  if (variable.locate(input)) {
    return variable.read(input);
  }

  if (declaration.locate(input)) {
    return declaration.read(input);
  }

  if (selector.locate(input)) {
    return selector.read(input, parseBlock);
  }

  if (directive.locate(input)) {
    return directive.read(input, parseBlock);
  }

  if (comment.locate(input)) {
    return comment.read(input);
  }

  throw new Error(`CSS syntax error: Unknown error at "${input.peek()}"`);
}

export default parseBlock;
