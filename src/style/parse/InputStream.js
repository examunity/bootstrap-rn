class InputStream {
  constructor(input) {
    this.input = input;
    this.cursor = 0;
  }

  peek(offset = 0) {
    return this.input.charAt(this.cursor + offset);
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

  charsWhile(check) {
    let value = '';

    while (check(this.peek())) {
      value += this.read();
    }

    return value;
  }

  remainingChars() {
    return this.input.length - this.cursor;
  }
}

export default InputStream;
