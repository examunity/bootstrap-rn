import React from 'react';
import View from '../View';
import { subtract } from '../../theme/functions';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import useForcedContext from '../../hooks/useForcedContext';
import PopoverContext from './PopoverContext';
import { ThemeVariables } from '../../types';

export type PopoverArrowProps = {
  style?: unknown;
};

const styles = StyleSheet.create({
  '.popover-arrow': css`
    position: absolute;
    // display: block;
    width: $popover-arrow-width;
    height: $popover-arrow-height;
  `,
  '.popover-arrow::before': css`
    position: absolute;
    // display: block;
    // content: "";
    border-top-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-style: solid;
  `,
  '.popover-arrow::after': css`
    position: absolute;
    // display: block;
    // content: "";
    border-top-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-style: solid;
  `,
  '.bs-popover-top .popover-arrow': css`
    bottom: ${subtract(
      (t: ThemeVariables) => `-${t['popover-arrow-height']}`,
      (t: ThemeVariables) => t['popover-border-width'],
    )};
  `,
  '.bs-popover-top .popover-arrow::before': css`
    bottom: 0;
    border-top-width: $popover-arrow-height;
    border-right-width: $popover-arrow-width * 0.5;
    border-left-width: $popover-arrow-width * 0.5;
    border-bottom-width: 0;
    border-top-color: $popover-arrow-outer-color;
  `,
  '.bs-popover-top .popover-arrow::after': css`
    bottom: $popover-border-width;
    border-top-width: $popover-arrow-height;
    border-right-width: $popover-arrow-width * 0.5;
    border-left-width: $popover-arrow-width * 0.5;
    border-bottom-width: 0;
    border-top-color: $popover-arrow-color;
  `,
  '.bs-popover-end .popover-arrow': css`
    left: ${subtract(
      (t: ThemeVariables) => `-${t['popover-arrow-height']}`,
      (t: ThemeVariables) => t['popover-border-width'],
    )};
    width: $popover-arrow-height;
    height: $popover-arrow-width;
  `,
  '.bs-popover-end .popover-arrow::before': css`
    left: 0;
    border-top-width: $popover-arrow-width * 0.5;
    border-right-width: $popover-arrow-height;
    border-left-width: 0;
    border-bottom-width: $popover-arrow-width * 0.5;
    border-right-color: $popover-arrow-outer-color;
  `,
  '.bs-popover-end .popover-arrow::after': css`
    left: $popover-border-width;
    border-top-width: $popover-arrow-width * 0.5;
    border-right-width: $popover-arrow-height;
    border-left-width: 0;
    border-bottom-width: $popover-arrow-width * 0.5;
    border-right-color: $popover-arrow-color;
  `,
  '.bs-popover-bottom .popover-arrow': css`
    top: ${subtract(
      (t: ThemeVariables) => `-${t['popover-arrow-height']}`,
      (t: ThemeVariables) => t['popover-border-width'],
    )};
  `,
  '.bs-popover-bottom .popover-arrow::before': css`
    top: 0;
    border-top-width: 0;
    border-right-width: $popover-arrow-width * 0.5;
    border-left-width: $popover-arrow-width * 0.5;
    border-bottom-width: $popover-arrow-height;
    border-bottom-color: $popover-arrow-outer-color;
  `,
  '.bs-popover-bottom .popover-arrow::after': css`
    top: $popover-border-width;
    border-top-width: 0;
    border-right-width: $popover-arrow-width * 0.5;
    border-left-width: $popover-arrow-width * 0.5;
    border-bottom-width: $popover-arrow-height;
    border-bottom-color: $popover-arrow-color;
  `,
  '.bs-popover-start .popover-arrow': css`
    right: ${subtract(
      (t: ThemeVariables) => `-${t['popover-arrow-height']}`,
      (t: ThemeVariables) => t['popover-border-width'],
    )};
    width: $popover-arrow-height;
    height: $popover-arrow-width;
  `,
  '.bs-popover-start .popover-arrow::before': css`
    right: 0;
    border-top-width: $popover-arrow-width * 0.5;
    border-right-width: 0;
    border-left-width: $popover-arrow-height;
    border-bottom-width: $popover-arrow-width * 0.5;
    border-left-color: $popover-arrow-outer-color;
  `,
  '.bs-popover-start .popover-arrow::after': css`
    right: $popover-border-width;
    border-top-width: $popover-arrow-width * 0.5;
    border-right-width: 0;
    border-left-width: $popover-arrow-height;
    border-bottom-width: $popover-arrow-width * 0.5;
    border-left-color: $popover-arrow-color;
  `,
});

const PopoverArrow = React.forwardRef<ViewRef, PopoverArrowProps>(
  (props, ref) => {
    const { style, ...elementProps } = props;

    const { placement, arrowStyle, popper } = useForcedContext(PopoverContext);

    const classes = getStyles(styles, [
      '.popover-arrow',
      popper && `.bs-popover-${placement} .popover-arrow`,
    ]);
    const beforeClasses = getStyles(styles, [
      '.popover-arrow::before',
      popper && `.bs-popover-${placement} .popover-arrow::before`,
    ]);
    const afterClasses = getStyles(styles, [
      '.popover-arrow::after',
      popper && `.bs-popover-${placement} .popover-arrow::after`,
    ]);

    return (
      <View {...elementProps} ref={ref} style={[classes, arrowStyle, style]}>
        <View style={beforeClasses} />
        <View style={afterClasses} />
      </View>
    );
  },
);

PopoverArrow.displayName = 'PopoverArrow';

export default PopoverArrow;
