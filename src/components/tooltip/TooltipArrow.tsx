import React from 'react';
import View, { ViewProps, ViewRef } from '../View';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import useForcedContext from '../../hooks/useForcedContext';
import TooltipContext from './TooltipContext';

export interface TooltipArrowProps extends ViewProps {}

const styles = StyleSheet.create({
  '.tooltip-arrow': css`
    position: absolute;
    // display: block;
    width: $tooltip-arrow-width;
    height: $tooltip-arrow-height;
  `,
  '.tooltip-arrow::before': css`
    position: absolute;
    // content: "";
    border-top-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-style: solid;
  `,
  '.bs-tooltip-top .tooltip-arrow': css`
    bottom: 0;
  `,
  '.bs-tooltip-top .tooltip-arrow::before': css`
    top: -1px;
    border-top-width: $tooltip-arrow-height;
    border-right-width: $tooltip-arrow-width * 0.5;
    border-left-width: $tooltip-arrow-width * 0.5;
    border-bottom-width: 0;
    border-top-color: $tooltip-arrow-color;
  `,
  '.bs-tooltip-end .tooltip-arrow': css`
    left: 0;
    width: $tooltip-arrow-height;
    height: $tooltip-arrow-width;
  `,
  '.bs-tooltip-end .tooltip-arrow::before': css`
    right: -1px;
    border-top-width: $tooltip-arrow-width * 0.5;
    border-right-width: $tooltip-arrow-height;
    border-left-width: 0;
    border-bottom-width: $tooltip-arrow-width * 0.5;
    border-right-color: $tooltip-arrow-color;
  `,
  '.bs-tooltip-bottom .tooltip-arrow': css`
    top: 0;
  `,
  '.bs-tooltip-bottom .tooltip-arrow::before': css`
    bottom: -1px;
    border-top-width: 0;
    border-right-width: $tooltip-arrow-width * 0.5;
    border-left-width: $tooltip-arrow-width * 0.5;
    border-bottom-width: $tooltip-arrow-height;
    border-bottom-color: $tooltip-arrow-color;
  `,
  '.bs-tooltip-start .tooltip-arrow': css`
    right: 0;
    width: $tooltip-arrow-height;
    height: $tooltip-arrow-width;
  `,
  '.bs-tooltip-start .tooltip-arrow::before': css`
    left: -1px;
    border-top-width: $tooltip-arrow-width * 0.5;
    border-right-width: 0;
    border-left-width: $tooltip-arrow-height;
    border-bottom-width: $tooltip-arrow-width * 0.5;
    border-left-color: $tooltip-arrow-color;
  `,
});

const TooltipArrow = React.forwardRef<ViewRef, TooltipArrowProps>(
  (props, ref) => {
    const { style, ...elementProps } = props;

    const { placement, arrowStyle, popper } = useForcedContext(TooltipContext);

    const classes = getStyles(styles, [
      '.tooltip-arrow',
      popper && `.bs-tooltip-${placement} .tooltip-arrow`,
    ]);
    const beforeClasses = getStyles(styles, [
      '.tooltip-arrow::before',
      popper && `.bs-tooltip-${placement} .tooltip-arrow::before`,
    ]);

    return (
      <View {...elementProps} ref={ref} style={[classes, arrowStyle, style]}>
        <View style={beforeClasses} />
      </View>
    );
  },
);

TooltipArrow.displayName = 'TooltipArrow';

export default TooltipArrow;
