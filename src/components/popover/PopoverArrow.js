import React from 'react';
import PropTypes from 'prop-types';
import View from '../View';
import { subtract } from '../../theme/functions';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import useForcedContext from '../../hooks/useForcedContext';
import PopoverContext from './PopoverContext';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.popover-arrow': css`
    position: absolute;
    // display: block;
    width: $popover-arrow-width;
    height: $popover-arrow-height;
  `,
  '.popover-arrow-before': css`
    position: absolute;
    // display: block;
    // content: "";
    border-top-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-style: solid;
  `,
  '.popover-arrow-after': css`
    position: absolute;
    // display: block;
    // content: "";
    border-top-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-style: solid;
  `,
  '.popover-arrow-top': css`
    bottom: ${(t) =>
      subtract(`-${t['popover-arrow-height']}`, t['popover-border-width'])};
  `,
  '.popover-arrow-top-before': css`
    bottom: 0;
    border-top-width: $popover-arrow-height;
    border-right-width: $popover-arrow-width * 0.5;
    border-left-width: $popover-arrow-width * 0.5;
    border-bottom-width: 0;
    border-top-color: $popover-arrow-outer-color;
  `,
  '.popover-arrow-top-after': css`
    bottom: $popover-border-width;
    border-top-width: $popover-arrow-height;
    border-right-width: $popover-arrow-width * 0.5;
    border-left-width: $popover-arrow-width * 0.5;
    border-bottom-width: 0;
    border-top-color: $popover-arrow-color;
  `,
  '.popover-arrow-end': css`
    left: ${(t) =>
      subtract(`-${t['popover-arrow-height']}`, t['popover-border-width'])};
    width: $popover-arrow-height;
    height: $popover-arrow-width;
  `,
  '.popover-arrow-end-before': css`
    left: 0;
    border-top-width: $popover-arrow-width * 0.5;
    border-right-width: $popover-arrow-height;
    border-left-width: 0;
    border-bottom-width: $popover-arrow-width * 0.5;
    border-right-color: $popover-arrow-outer-color;
  `,
  '.popover-arrow-end-after': css`
    left: $popover-border-width;
    border-top-width: $popover-arrow-width * 0.5;
    border-right-width: $popover-arrow-height;
    border-left-width: 0;
    border-bottom-width: $popover-arrow-width * 0.5;
    border-right-color: $popover-arrow-color;
  `,
  '.popover-arrow-bottom': css`
    top: ${(t) =>
      subtract(`-${t['popover-arrow-height']}`, t['popover-border-width'])};
  `,
  '.popover-arrow-bottom-before': css`
    top: 0;
    border-top-width: 0;
    border-right-width: $popover-arrow-width * 0.5;
    border-left-width: $popover-arrow-width * 0.5;
    border-bottom-width: $popover-arrow-height;
    border-bottom-color: $popover-arrow-outer-color;
  `,
  '.popover-arrow-bottom-after': css`
    top: $popover-border-width;
    border-top-width: 0;
    border-right-width: $popover-arrow-width * 0.5;
    border-left-width: $popover-arrow-width * 0.5;
    border-bottom-width: $popover-arrow-height;
    border-bottom-color: $popover-arrow-color;
  `,
  '.popover-arrow-start': css`
    right: ${(t) =>
      subtract(`-${t['popover-arrow-height']}`, t['popover-border-width'])};
    width: $popover-arrow-height;
    height: $popover-arrow-width;
  `,
  '.popover-arrow-start-before': css`
    right: 0;
    border-top-width: $popover-arrow-width * 0.5;
    border-right-width: 0;
    border-left-width: $popover-arrow-height;
    border-bottom-width: $popover-arrow-width * 0.5;
    border-left-color: $popover-arrow-outer-color;
  `,
  '.popover-arrow-start-after': css`
    right: $popover-border-width;
    border-top-width: $popover-arrow-width * 0.5;
    border-right-width: 0;
    border-left-width: $popover-arrow-height;
    border-bottom-width: $popover-arrow-width * 0.5;
    border-left-color: $popover-arrow-color;
  `,
});

const PopoverArrow = React.forwardRef((props, ref) => {
  const { style, ...elementProps } = props;

  const { placement, arrowStyle } = useForcedContext(PopoverContext);

  const classes = getStyles(styles, [
    '.popover-arrow',
    `.popover-arrow-${placement}`,
  ]);
  const beforeClasses = getStyles(styles, [
    '.popover-arrow-before',
    `.popover-arrow-${placement}-before`,
  ]);
  const afterClasses = getStyles(styles, [
    '.popover-arrow-after',
    `.popover-arrow-${placement}-after`,
  ]);

  return (
    <View {...elementProps} ref={ref} style={[classes, arrowStyle, style]}>
      <View style={beforeClasses} />
      <View style={afterClasses} />
    </View>
  );
});

PopoverArrow.displayName = 'PopoverArrow';
PopoverArrow.propTypes = propTypes;

export default PopoverArrow;
