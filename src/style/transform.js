import { Platform, PixelRatio } from 'react-native';
import { getPropertyName, getStylesForProperty } from 'css-to-react-native';

const applyTheme = (theme, value) =>
  typeof value === 'function' ? value(theme) : value;

const transformREMUnitRE = /([+-\d.Ee]+)rem/;

const transformREMUnit = (value) => {
  if (Platform.OS === 'web') {
    return value;
  }

  return value.replace(
    transformREMUnitRE,
    (_, number) => `${PixelRatio.getFontScale() * 16 * number}px`,
  );
};

export default function transform(definitions, theme) {
  return definitions.map((item) => ({
    ...item,
    declarations: Object.entries(item.declarations)
      .map(([name, fragments]) => {
        // Resolve functions with theme.
        const value = fragments.reduce(
          (result, current) => `${result}${applyTheme(theme, current)}`,
          '',
        );

        // Transform value to react native compatible value.

        // TODO: Pre-process css-to-react-native transformation, so that we only
        // need to insert theme variables here.
        return getStylesForProperty(
          getPropertyName(name),
          transformREMUnit(value),
        );
      })
      .reduce((result, current) => Object.assign(result, current), {}),
  }));
}
