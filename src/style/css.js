import parse from './parse';
import transform from './transform';
import createStyle from './createStyle';

export default function css(...args) {
  const definitions = parse(...args);

  return (theme) => createStyle(transform(definitions, theme));
}
