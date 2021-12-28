import isIdent from '../isIdent';
import isWhitespace from '../isWhitespace';

const breaksDeclaration = (char) =>
  typeof char !== 'function' &&
  char !== '$' &&
  char !== ';' &&
  char !== '}' &&
  char !== '';

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
    input.charsWhile(isWhitespace, true);

    // Parse value.
    const value = [];

    do {
      // Add function to resolve variable.
      if (input.peek() === '$') {
        input.read('$');

        const variableName = input.charsWhile(isIdent);

        value.push((variables) => {
          if (variables[variableName] === undefined) {
            throw new Error(`Variable $${variableName} is not defined.`);
          }

          return variables[variableName];
        });
      }

      // Add function.
      if (typeof input.peek() === 'function') {
        value.push(input.read());
      }

      const part = input.charsWhile(breaksDeclaration, true);

      if (part.length > 0) {
        value.push(part);
      }
    } while (input.peek() === '$' || typeof input.peek() === 'function');

    if (input.peek() === ';') {
      input.read(';');
    }

    return {
      type: 'declaration',
      name,
      value,
    };
  },
};

export default declaration;
