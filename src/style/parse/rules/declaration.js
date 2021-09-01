import { getPropertyName, getStylesForProperty } from 'css-to-react-native';
import isIdent from '../isIdent';
import isWhitespace from '../isWhitespace';

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
    const value = input.charsWhile(
      (char) => char !== ';' && char !== '}' && char !== '',
    );

    if (input.peek() === ';') {
      input.read(';');
    }

    // Transform value to react native compatible value.
    return getStylesForProperty(getPropertyName(name), value);
  },
};

export default declaration;
