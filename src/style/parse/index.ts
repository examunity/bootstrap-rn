import InputStream, { Char } from './InputStream';
import parseBlock from './parseBlock';

function parse(fragments: TemplateStringsArray, ...tags: Char[]) {
  const input = new InputStream(fragments, tags);

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
