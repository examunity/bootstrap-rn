import React, { useContext } from 'react';
import { I18nManager, StyleSheet as StyleUtils } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../style/StyleSheet';
import { getStyles } from '../utils';
import css from '../style/css';
import TextStyleContext from '../style/TextStyleContext';
import View from './View';

const DIRECTIONS = ['up', 'down', 'start', 'end'];

const propTypes = {
  color: PropTypes.string,
  direction: PropTypes.oneOf(DIRECTIONS),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const getColor = (context) => {
  if (context && context.style) {
    const flattenedStyle = StyleUtils.flatten(context.style);

    if (flattenedStyle.color) {
      return flattenedStyle.color;
    }
  }

  return StyleSheet.value('body-color');
};

const getBorderColorStyle = (color, direction) => {
  switch (direction) {
    case 'down':
      return { borderTopColor: color };
    case 'up':
      return { borderBottomColor: color };
    case 'end':
      return I18nManager.isRTL
        ? { borderRightColor: color }
        : { borderLeftColor: color };
    case 'start':
      return I18nManager.isRTL
        ? { borderLeftColor: color }
        : { borderRightColor: color };
    default:
      throw new Error('Unknown direction.');
  }
};

const styles = StyleSheet.create({
  caret: css`
    // &::after styles
    // display: inline-block;
    margin-left: $caret-spacing;
    // vertical-align: $caret-vertical-align;
    align-self: center; // added for bootstrap-rn
    // content: "";
  `,
  'caret-down': css`
    // &::after styles
    border-top-width: $caret-width;
    border-right-width: $caret-width;
    border-right-color: transparent;
    border-bottom-width: 0;
    border-left-width: $caret-width;
    border-left-color: transparent;
  `,
  'caret-up': css`
    // &::after styles
    border-top-width: 0;
    border-right-width: $caret-width;
    border-right-color: transparent;
    border-bottom-width: $caret-width;
    border-left-width: $caret-width;
    border-left-color: transparent;
  `,
  'caret-end': css`
    // &::after styles
    border-top-width: $caret-width;
    border-top-color: transparent;
    border-right-width: 0;
    border-bottom-width: $caret-width;
    border-bottom-color: transparent;
    border-left-width: $caret-width;
  `,
  'caret-start': css`
    // &::after styles
    // display: none;

    // &::before styles
    // display: inline-block;
    margin-left: 0; // added for bootstrap-rn
    margin-right: $caret-spacing;
    // vertical-align: $vertical-align;
    // content: "";
    border-top-width: $caret-width;
    border-top-color: transparent;
    border-right-width: $caret-width;
    border-bottom-width: $caret-width;
    border-bottom-color: transparent;
  `,
});

const Caret = React.forwardRef((props, ref) => {
  const { color, direction = 'down', style, ...elementProps } = props;

  const context = useContext(TextStyleContext);

  const classes = getStyles(styles, ['caret', `caret-${direction}`]);

  return (
    <View
      {...elementProps}
      ref={ref}
      style={[
        classes,
        getBorderColorStyle(color || getColor(context), direction),
        style,
      ]}
    />
  );
});

Caret.displayName = 'Caret';
Caret.propTypes = propTypes;

export default Caret;
