import applyTheme from './utils/applyTheme';
import parse from './parse';
import createStyle from './createStyle';

export default function css(fragments, ...values) {
  return (theme) => {
    const definitions = parse(applyTheme(theme, fragments, values));

    return createStyle(definitions);
  };
}
