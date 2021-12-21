import InputStream from './InputStream';
import parseBlock from './parseBlock';

function parse(...args) {
  const input = new InputStream(...args);

  const children = [];

  while (input.remainingChars() > 0) {
    const block = parseBlock(input);

    if (block) {
      children.push(block);
    }
  }

  return {
    type: 'root',
    children,
  };
}

export default parse;
