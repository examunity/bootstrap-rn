import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import Text from './Text';
import { getStyles, each } from '../utils';

const FONT_SIZES = {
  1: (t) => t['h1-font-size'],
  2: (t) => t['h2-font-size'],
  3: (t) => t['h3-font-size'],
  4: (t) => t['h4-font-size'],
  5: (t) => t['h5-font-size'],
  6: (t) => t['h6-font-size'],
};

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(Object.keys(FONT_SIZES).map((k) => Number(k)))
    .isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

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

const Heading = React.forwardRef((props, ref) => {
  const { children, size, style, ...elementProps } = props;

  const classes = getStyles(styles, ['heading', `.h${size}`]);

  return (
    <Text
      {...elementProps}
      ref={ref}
      accessibilityRole="header"
      accessibilityLevel={size}
      style={[classes, style]}
    >
      {children}
    </Text>
  );
});

Heading.displayName = 'Heading';
Heading.propTypes = propTypes;

export default Heading;
