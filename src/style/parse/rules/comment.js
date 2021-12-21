const consumeAsterisk = (input) => {
  input.read('*');

  if (input.peek() === '/') {
    input.read('/');

    return false;
  }

  return true;
};

const comment = {
  locate(input) {
    return (
      input.peek() === '/' && (input.peek(1) === '*' || input.peek(1) === '/')
    );
  },
  read(input) {
    input.read('/');

    // Read until new line for inline comments
    if (input.peek() === '/') {
      input.read('/');
      input.charsWhile((char) => char !== '\n');
      return null;
    }

    input.read('*');

    // Read until comment ending
    do {
      input.charsWhile((char) => char !== '*');
    } while (consumeAsterisk(input));

    return null;
  },
};

export default comment;
