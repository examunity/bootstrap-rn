import isIdent from '../isIdent';
import isWhitespace from '../isWhitespace';

const SELECTOR_TYPES = ['hover', 'focus', 'focus-visible', 'active'];

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

    input.charsWhile(isWhitespace);
    input.read('{');

    const children = [];

    while (input.peek() !== '}') {
      const block = parseBlock(input);

      if (block) {
        children.push(block);
      }
    }
    input.read('}');

    return {
      type: 'block',
      scopes: [
        {
          type: 'selector',
          name,
        },
      ],
      children,
    };
  },
};

export default selector;
