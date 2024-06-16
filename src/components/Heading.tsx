import React from 'react';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import Text from './Text';
import { FONT_SIZES } from '../theme/proxies';
import { getStyles, each } from '../utils';

export interface HeadingProps extends TextProps {
  size: keyof typeof FONT_SIZES;
}

const styles = StyleSheet.create({
  heading: css`
    margin-top: 0; // 1
    margin-bottom: $headings-margin-bottom;
    font-family: $headings-font-family;
    font-style: $headings-font-style;
    font-weight: $headings-font-weight;
    color: $headings-color;
  `,
  ...each(FONT_SIZES, (size, value) => ({
    [`.h${size}`]: css`
      font-size: ${value};
      line-height: ${value} * $headings-line-height;
    `,
  })),
});

const Heading = React.forwardRef<TextRef, HeadingProps>((props, ref) => {
  const { children, size, style, ...elementProps } = props;

  const classes = getStyles(styles, ['heading', `.h${size}`]);

  return (
    <Text
      {...elementProps}
      ref={ref}
      role="heading"
      aria-level={size}
      style={[classes, style]}
    >
      {children}
    </Text>
  );
});

Heading.displayName = 'Heading';

export default Heading;
