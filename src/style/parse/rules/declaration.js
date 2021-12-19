import isIdent from '../isIdent';
import isWhitespace from '../isWhitespace';

const breaksDeclaration = (char) =>
  typeof char !== 'function' && char !== ';' && char !== '}' && char !== '';

const declaration = {
  locate(input) {
    return /[a-z_]/i.test(input.peek());
  },
  read(input) {
    // Parse name.
    const name = input.charsWhile(isIdent);

    // Parse whitespaces, separator
    input.charsWhile(isWhitespace);
    input.read(':');
    input.charsWhile(isWhitespace);

    // Parse value.
    const value = [];

    do {
      if (typeof input.peek() === 'function') {
        value.push(input.read());
      }

      const part = input.charsWhile(breaksDeclaration);

      if (part.length > 0) {
        value.push(part);
      }
    } while (typeof input.peek() === 'function');

    if (input.peek() === ';') {
      input.read(';');
    }

    return {
      [name]: value,
    };
  },
};

export default declaration;
