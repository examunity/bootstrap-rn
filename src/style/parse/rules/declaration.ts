import type { DeclarationNode } from '../../transform';
import InputStream, { Char } from '../InputStream';
import isIdent from '../isIdent';
import isWhitespace from '../isWhitespace';

const breaksDeclaration = (char: Char) =>
  typeof char !== 'function' &&
  char !== '$' &&
  char !== ';' &&
  char !== '}' &&
  // char !== '(' &&
  char !== '';

const declaration = {
  locate(input: InputStream) {
    const char = input.peek();
    return typeof char === 'string' && /[a-z_]/i.test(char);
  },
  read(input: InputStream) {
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

        value.push((variables: Record<string, string>) => {
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

      // TODO: Parse functions
      /* if (input.peek() === '(') {

      } */

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
    } as DeclarationNode;
  },
};

export default declaration;
