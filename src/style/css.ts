import parse from './parse';
import transform from './transform';
import createStyle from './createStyle';
import type { ThemeVariables, StyleValue } from '../types';

export default function css(
  fragments: TemplateStringsArray,
  ...tags: (string | ((t: ThemeVariables) => StyleValue))[]
) {
  const ast = parse(fragments, ...tags);

  const result = (theme: object, key: string) => {
    const transformed = transform(ast.children, theme, { key });

    return createStyle(transformed);
  };

  result.ast = ast;

  return result;
}
