import parse from './parse';
import transform from './transform';
import createStyle from './createStyle';

export default function css(...args) {
  const ast = parse(...args);

  const result = (theme, key) => {
    const transformed = transform(ast.children, theme, { key });

    return createStyle(transformed);
  };

  result.ast = ast;

  return result;
}
