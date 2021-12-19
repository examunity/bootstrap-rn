import InputStream from './InputStream';
import parseBlock from './parseBlock';

function parse(...args) {
  const input = new InputStream(...args);

  let result = [
    {
      conditions: [],
      declarations: {},
    },
  ];

  while (input.remainingChars() > 0) {
    result = parseBlock(input, result);
  }

  return result;
}

export default parse;
