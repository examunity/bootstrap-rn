import isIdent from '../isIdent';
import isWhitespace from '../isWhitespace';

const SELECTOR_TYPES = ['hover', 'focus', 'active'];

const selector = {
  locate(input) {
    return input.peek() === '&' && input.peek(1) === ':';
  },
  read(input, parseBlock) {
    input.read('&');
    input.read(':');

    const name = input.charsWhile(isIdent);

    if (!SELECTOR_TYPES.includes(name)) {
      throw new Error(`CSS syntax error: Unexpected selector name "${name}".`);
    }

    const condition = {
      type: 'selector',
      name,
    };

    input.charsWhile(isWhitespace);
    input.read('{');

    let result = [
      {
        conditions: [condition],
        declarations: {},
      },
    ];

    while (input.peek() !== '}') {
      result = parseBlock(input, result);
    }
    input.read('}');

    return result;
  },
};

export default selector;
