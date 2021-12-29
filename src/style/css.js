import parse from './parse';
import transform from './transform';
import createStyle from './createStyle';
import { BOOTSTYLE_DEFINITION } from './symbols';

export default function css(...args) {
  const ast = parse(...args);

  const result = (theme) => createStyle(transform(ast.children, theme));

  result.$$typeof = BOOTSTYLE_DEFINITION;
  result.ast = ast;

  return result;
}
