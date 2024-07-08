import InputStream, { Char } from '../InputStream';

const consumeAsterisk = (input: InputStream) => {
  input.read('*');

  if (input.peek() === '/') {
    input.read('/');

    return false;
  }

  return true;
};

const comment = {
  locate(input: InputStream) {
    return (
      input.peek() === '/' && (input.peek(1) === '*' || input.peek(1) === '/')
    );
  },
  read(input: InputStream) {
    input.read('/');

    // Read until new line for inline comments
    if (input.peek() === '/') {
      input.read('/');
      input.charsWhile((char: Char) => char !== '\n');
      return null;
    }

    input.read('*');

    // Read until comment ending
    do {
      input.charsWhile((char: Char) => char !== '*');
    } while (consumeAsterisk(input));

    return null;
  },
};

export default comment;
