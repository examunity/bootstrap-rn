import React, { useContext, useMemo } from 'react';
import { Text as BaseText } from 'react-native';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import useMedia from '../hooks/useMedia';
import TextStyleContext, {
  TextStyleContextType,
} from '../style/TextStyleContext';
import { getStyles } from '../utils';
import { ThemeColorsType } from '../theme/proxies';
import useStyle from '../hooks/useStyle';

type ThemeColors = ThemeColorsType | 'muted' | 'black-50' | 'white-50';

const styles = StyleSheet.create({
  text: css`
    font-family: $font-family-base;
    font-size: $font-size-base;
    font-weight: $font-weight-base;
    line-height: $font-size-base * $line-height-base;
  `,
  strong: css`
    font-weight: $font-weight-bolder;
  `,
  italic: css`
    font-style: italic;
  `,
  small: css`
    font-size: $small-font-size;
    line-height: $small-font-size * $line-height-base;
  `,
  mark: css`
    padding: $mark-padding;
    background-color: $mark-bg;
  `,
});

const getStyleName = (styleName?: string, color?: ThemeColors) => {
  if (!color) {
    return styleName;
  }
  return styleName
    ? `text-${String(color)} ${styleName}`
    : `text-${String(color)}`;
};

const Text = React.forwardRef<TextRef, TextProps>((props, ref) => {
  const {
    color, // will be deprecated soon
    bold = false,
    italic = false,
    mark = false,
    small = false,
    style,
    styleName,
    ...elementProps
  } = props;

  const media = useMedia();
  const context = useContext<TextStyleContextType | null>(TextStyleContext);

  const classes = getStyles(styles, [
    bold && 'strong',
    italic && 'italic',
    small && 'small',
    mark && 'mark',
  ]);

  const resolveStyle = useStyle(
    [
      // @ts-expect-error: styles is possibly 'null'.
      (!context || !context.hasTextAncestor) && styles.text,
      context && context.style,
      classes,
      style,
    ],
    getStyleName(styleName, color),
  );

  const contextValue = useMemo(
    () => ({
      style: null,
      hasTextAncestor: true,
    }),
    [],
  );

  const element = (
    <BaseText {...elementProps} ref={ref} style={resolveStyle({ media })} />
  );

  if (context && context.hasTextAncestor && !context.style) {
    return element;
  }

  return (
    <TextStyleContext.Provider value={contextValue}>
      {element}
    </TextStyleContext.Provider>
  );
});

Text.displayName = 'Text';

export default Text;
