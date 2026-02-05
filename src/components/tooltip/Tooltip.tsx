import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import View, { ViewProps, ViewRef } from '../View';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import TooltipArrow from './TooltipArrow';
import TooltipInner from './TooltipInner';
import TooltipContext from './TooltipContext';
import type { OverlayPhysicalPlacement } from '../../types';

export interface TooltipProps extends ViewProps {
  placement?: OverlayPhysicalPlacement;
  floating?: boolean;
}

const styles = StyleSheet.create({
  '.tooltip': css`
    position: absolute;
    // z-index: $zindex-tooltip;
    // display: block;
    margin: $tooltip-margin;
    // opacity: 0;
  `,
  '.tooltip --text': css`
    // Our parent element can be arbitrary since tooltips are by default inserted as a sibling of their target element.
    // So reset our font and text properties to avoid inheriting weird values.
    // @include reset-text();
    font-size: $tooltip-font-size;
    // Allow breaking very long words so they don't overflow the tooltip's bounds
    // word-wrap: break-word;
  `,
});

const Tooltip = React.forwardRef<ViewRef, TooltipProps>((props, ref) => {
  const {
    children,
    placement = 'top',
    floating,
    style,
    textStyle,
    ...elementProps
  } = props;

  const tooltip = useMemo(
    () => ({
      placement,
      floating,
    }),
    [placement, floating],
  );

  const classes = getStyles(styles, ['.tooltip']);
  const textClasses = getStyles(styles, ['.tooltip --text']);

  // Accessiblity role tooltip is only supported on web.
  const role = Platform.OS === 'web' ? 'tooltip' : undefined;

  return (
    <View
      {...elementProps}
      ref={ref}
      role={role}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      <TooltipContext.Provider value={tooltip}>
        {children}
      </TooltipContext.Provider>
    </View>
  );
});

Tooltip.displayName = 'Tooltip';

export default Object.assign(Tooltip, {
  Arrow: TooltipArrow,
  Inner: TooltipInner,
});
