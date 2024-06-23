import React, { useContext, useMemo } from 'react';
import { Text as BaseText, TextProps as BaseTextProps } from 'react-native';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import useMedia from '../hooks/useMedia';
import TextStyleContext from '../style/TextStyleContext';
import { getStyles } from '../utils';
import { THEME_COLORS } from '../theme/proxies';
import useStyle from '../hooks/useStyle';
import type { ExtendedTextStyle, StyleProp, StyleName } from '../types';

export type TextRef = BaseText;

type ThemeColors =
  | keyof typeof THEME_COLORS
  | 'muted'
  | 'black-50'
  | 'white-50';

export interface TextProps extends Omit<BaseTextProps, 'style'> {
  color?: ThemeColors;
  small?: boolean;
  mark?: boolean;
  bold?: boolean;
  italic?: boolean;
  style?: StyleProp<ExtendedTextStyle>;
  styleName?: StyleName;
}

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

const getStyleName = (styleName?: StyleName, color?: ThemeColors) => {
  if (!color) {
    return styleName;
  }
  return styleName ? `text-${color} ${styleName}` : `text-${color}`;
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
  const context = useContext(TextStyleContext);

  const classes = getStyles(styles, [
    bold && 'strong',
    italic && 'italic',
    small && 'small',
    mark && 'mark',
  ]);

  const resolveStyle = useStyle(
    [
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
