const checkFunction = (char, silent) => {
  if (typeof char !== 'function') {
    return true;
  }

  if (silent) {
    return false;
  }

  throw new Error(`CSS syntax error: Unexpected function.`);
};

class InputStream {
  constructor(fragments, ...tags) {
    this.dictionary = fragments.reduce((result, current, i) => {
      const value = current.split('');
      const tag = tags[i - 1];

      if (!tag) {
        return [...result, ...value];
      }

      if (typeof tag !== 'string') {
        return [...result, tag, ...value];
      }

      return [...result, ...tag.split(''), ...value];
    });
    this.cursor = 0;
  }

  peek(offset = 0) {
    return this.dictionary[this.cursor + offset];
  }

  read(marker) {
    const char = this.peek();

    if (marker && marker !== char) {
      throw new Error(
        `CSS syntax error: Expected "${marker}", but found "${char}"`,
      );
    }

    if (this.remainingChars() === 0) {
      throw new Error(`CSS syntax error: Unexpected end of string.`);
    }

    this.cursor += 1;

    return char;
  }

  charsWhile(check, silent = false) {
    let value = '';

    while (checkFunction(this.peek(), silent) && check(this.peek())) {
      value += this.read();
    }

    return value;
  }

  remainingChars() {
    return this.dictionary.length - this.cursor;
  }
}

export default InputStream;
