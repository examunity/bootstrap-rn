// Bootstrap Button
import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import TextStyleProvider from '../../style/TextStyleProvider';
import Pressable from '../Pressable';
import { getStyles, each } from '../../utils';
import { THEME_COLORS } from '../../theme/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(Object.keys(THEME_COLORS)),
  dismissible: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.btn': css`
    position: relative;
    padding: $btn-padding-y $btn-padding-x;
    border: $btn-border-width solid transparent;
    border-radius: $btn-border-radius;
  `,
  '.btn-text': css`
    font-family: $btn-font-family;
    font-weight: $btn-font-weight;
    line-height: $btn-line-height;
    color: $body-color;
    text-align: center;
    text-decoration: $link-decoration;
    white-space: $btn-white-space;
    // vertical-align: middle;
  `,
  ...each(THEME_COLORS, (color, value) => ({
    [`.btn-${color}`]: css`
      background-color: ${value};
      border-color: ${value};
    `,
  })),
  '.btn-dismissible': {
    // TODO
  },
});

function Button(props) {
  const {
    children,
    color = 'primary',
    dismissible = false,
    style,
    ...elementProps
  } = props;

  const classes = getStyles(styles, [
    '.btn',
    `.btn-${color}`,
    dismissible && '.btn-dismissible',
  ]);

  const textClasses = getStyles(styles, ['.btn-text']);

  return (
    <Pressable {...elementProps} style={[classes, style]}>
      <TextStyleProvider value={textClasses}>{children}</TextStyleProvider>
    </Pressable>
  );
}

Button.propTypes = propTypes;
export default Button;
