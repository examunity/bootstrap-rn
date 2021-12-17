import isIdent from '../isIdent';
import isWhitespace from '../isWhitespace';

const consumeArgumentSeperator = (input) => {
  if (input.peek() !== ',') {
    return false;
  }

  input.read(',');

  return true;
};

const directive = {
  locate(input) {
    return input.peek() === '@';
  },
  read(input, parseBlock) {
    input.read('@');

    const directiveName = input.charsWhile(isIdent);

    if (directiveName !== 'include') {
      throw new Error('Wrong name.');
    }

    input.charsWhile(isWhitespace);
    const name = input.charsWhile(isIdent);

    if (name.length === 0) {
      throw new Error('No name.');
    }

    input.charsWhile(isWhitespace);
    input.read('(');

    const condition = {
      type: 'directive',
      name,
      args: [],
    };

    do {
      input.charsWhile(isWhitespace);
      condition.args.push(input.charsWhile(isIdent));
      input.charsWhile(isWhitespace);
    } while (consumeArgumentSeperator(input));

    input.read(')');
    input.charsWhile(isWhitespace);
    input.read('{');

    let result = [
      {
        conditions: [condition],
        declarations: [],
      },
    ];

    while (input.peek() !== '}') {
      result = parseBlock(input, result);
    }
    input.read('}');

    return result;
  },
};

export default directive;
