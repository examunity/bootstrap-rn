import type { VariableNode } from '../../transform';
import InputStream from '../InputStream';
import declaration from './declaration';

const variable = {
  locate(input: InputStream) {
    return input.peek() === '$';
  },
  read(input: InputStream) {
    input.read('$');

    if (!declaration.locate(input)) {
      throw new Error(`CSS syntax error: Unexpected char after $.`);
    }

    const { name, value } = declaration.read(input);

    return {
      type: 'variable',
      name,
      value,
    } as VariableNode;
  },
};

export default variable;
