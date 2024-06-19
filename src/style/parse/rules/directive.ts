import type { BlockNode, MixinStyleScope } from '../../transform';
import InputStream from '../InputStream';
import isIdent from '../isIdent';
import isWhitespace from '../isWhitespace';

const consumeArgumentSeperator = (input: InputStream) => {
  if (input.peek() !== ',') {
    return false;
  }

  input.read(',');

  return true;
};

const directive = {
  locate(input: InputStream) {
    return input.peek() === '@';
  },
  read(input: InputStream, parseBlock: (value: InputStream) => object | null) {
    input.read('@');

    const directiveName = input.charsWhile(isIdent);

    if (directiveName !== 'include') {
      throw new Error('Only @include directive is supported.');
    }

    input.charsWhile(isWhitespace);
    const name = input.charsWhile(isIdent);

    if (name.length === 0) {
      throw new Error('No name.');
    }

    input.charsWhile(isWhitespace);
    input.read('(');

    const args = [];

    do {
      input.charsWhile(isWhitespace);
      args.push(input.charsWhile(isIdent));
      input.charsWhile(isWhitespace);
    } while (consumeArgumentSeperator(input));

    input.read(')');
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
          type: 'mixin',
          name,
          args,
        } as MixinStyleScope,
      ],
      children,
    } as BlockNode;
  },
};

export default directive;
