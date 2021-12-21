import declaration from './declaration';

const variable = {
  locate(input) {
    return input.peek() === '$';
  },
  read(input) {
    input.read('$');

    if (!declaration.locate(input)) {
      throw new Error(`CSS syntax error: Unexpected char after $.`);
    }

    const { name, value } = declaration.read(input);

    return {
      type: 'variable',
      name,
      value,
    };
  },
};

export default variable;
