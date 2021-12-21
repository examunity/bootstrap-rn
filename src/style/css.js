import parse from './parse';
import transform from './transform';
import createStyle from './createStyle';

export const BOOTSTYLE_STYLE = Symbol.for('bootstyle.style');

export default function css(...args) {
  const ast = parse(...args);

  const result = (theme) => createStyle(transform(ast.children, theme));

  result.$$typeof = BOOTSTYLE_STYLE;
  result.ast = ast;

  return result;
}
