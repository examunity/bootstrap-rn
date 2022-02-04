import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import Text from './Text';
import { FONT_SIZES } from '../theme/proxies';
import { getStyles, each } from '../utils';

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
