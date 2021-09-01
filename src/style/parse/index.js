import InputStream from './InputStream';
import parseBlock from './parseBlock';

function parse(data) {
  const input = new InputStream(data);

  let result = [
    {
      conditions: [],
      declarations: {},
    },
  ];

  while (input.remainingChars() > 0) {
    result = parseBlock(input, result);
  }

  console.log(result);

  return result;
}

export default parse;
