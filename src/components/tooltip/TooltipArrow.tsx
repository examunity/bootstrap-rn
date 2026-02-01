import React from 'react';
import View, { ViewProps, ViewRef } from '../View';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import useForcedContext from '../../hooks/useForcedContext';
import TooltipContext from './TooltipContext';
import type { OverlayPlacement } from '../../types';

export interface TooltipArrowProps extends ViewProps {}

// Note: Border colors are defined for each side, because it seems like that the new react native
// architecture overwrites border colors from a previous style on Android.
// Example: `.bs-tooltip-top .tooltip-arrow::before` overwrites `.tooltip-arrow::before`

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
    bottom: -1 * $tooltip-arrow-height;
  `,
  '.bs-tooltip-top .tooltip-arrow::before': css`
    top: -1px;
    border-top-width: $tooltip-arrow-height;
    border-right-width: $tooltip-arrow-width * 0.5;
    border-left-width: $tooltip-arrow-width * 0.5;
    border-bottom-width: 0;
    border-top-color: $tooltip-arrow-color;
    border-right-color: transparent; // added for bootstrap-rn
    border-left-color: transparent; // added for bootstrap-rn
    border-bottom-color: transparent; // added for bootstrap-rn
  `,
  '.bs-tooltip-end .tooltip-arrow': css`
    left: -1 * $tooltip-arrow-height;
    width: $tooltip-arrow-height;
    height: $tooltip-arrow-width;
  `,
  '.bs-tooltip-end .tooltip-arrow::before': css`
    right: -1px;
    border-top-width: $tooltip-arrow-width * 0.5;
    border-right-width: $tooltip-arrow-height;
    border-left-width: 0;
    border-bottom-width: $tooltip-arrow-width * 0.5;
    border-top-color: transparent; // added for bootstrap-rn
    border-right-color: $tooltip-arrow-color;
    border-left-color: transparent; // added for bootstrap-rn
    border-bottom-color: transparent; // added for bootstrap-rn
  `,
  '.bs-tooltip-bottom .tooltip-arrow': css`
    top: -1 * $tooltip-arrow-height;
  `,
  '.bs-tooltip-bottom .tooltip-arrow::before': css`
    bottom: -1px;
    border-top-width: 0;
    border-right-width: $tooltip-arrow-width * 0.5;
    border-left-width: $tooltip-arrow-width * 0.5;
    border-bottom-width: $tooltip-arrow-height;
    border-top-color: transparent; // added for bootstrap-rn
    border-right-color: transparent; // added for bootstrap-rn
    border-left-color: transparent; // added for bootstrap-rn
    border-bottom-color: $tooltip-arrow-color;
  `,
  '.bs-tooltip-start .tooltip-arrow': css`
    right: -1 * $tooltip-arrow-height;
    width: $tooltip-arrow-height;
    height: $tooltip-arrow-width;
  `,
  '.bs-tooltip-start .tooltip-arrow::before': css`
    left: -1px;
    border-top-width: $tooltip-arrow-width * 0.5;
    border-right-width: 0;
    border-left-width: $tooltip-arrow-height;
    border-bottom-width: $tooltip-arrow-width * 0.5;
    border-top-color: transparent; // added for bootstrap-rn
    border-right-color: transparent; // added for bootstrap-rn
    border-left-color: $tooltip-arrow-color;
    border-bottom-color: transparent; // added for bootstrap-rn
  `,
});

const transformPlacement = (placement: OverlayPlacement) => {
  if (placement === 'left') {
    return 'start';
  }

  if (placement === 'right') {
    return 'end';
  }

  return placement;
};

const TooltipArrow = React.forwardRef<ViewRef, TooltipArrowProps>(
  (props, ref) => {
    const { style, ...elementProps } = props;

    const context = useForcedContext(TooltipContext);

    // For some reason the classes are named start/end, but they always define
    // the overlay on the left/right placement, so it has no effect on RTL.
    // Hint: RTL is already handled by the useOverlay hook.
    const placement = transformPlacement(context.placement);

    const classes = getStyles(styles, [
      '.tooltip-arrow',
      context.floating && `.bs-tooltip-${placement} .tooltip-arrow`,
    ]);
    const beforeClasses = getStyles(styles, [
      '.tooltip-arrow::before',
      context.floating && `.bs-tooltip-${placement} .tooltip-arrow::before`,
    ]);

    return (
      <View {...elementProps} ref={ref} style={[classes, style]}>
        <View style={beforeClasses} />
      </View>
    );
  },
);

TooltipArrow.displayName = 'TooltipArrow';

export default TooltipArrow;
