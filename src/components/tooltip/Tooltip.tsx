import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import View from '../View';
import StyleSheet from '../../style/StyleSheet';
import { getStyles, transformPlacement } from '../../utils';
import css from '../../style/css';
import TooltipArrow from './TooltipArrow';
import TooltipInner from './TooltipInner';
import TooltipContext from './TooltipContext';

export interface TooltipProps extends ViewProps {
  placement?: string;
  popper?: boolean;
  arrowStyle?: unknown;
}

const styles = StyleSheet.create({
  '.tooltip': css`
    position: absolute;
    z-index: $zindex-tooltip;
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
  '.bs-tooltip-top': css`
    padding: $tooltip-arrow-height 0;
  `,
  '.bs-tooltip-end': css`
    padding: 0 $tooltip-arrow-height;
  `,
  '.bs-tooltip-bottom': css`
    padding: $tooltip-arrow-height 0;
  `,
  '.bs-tooltip-start': css`
    padding: 0 $tooltip-arrow-height;
  `,
});

const Tooltip = React.forwardRef<ViewRef, TooltipProps>((props, ref) => {
  const {
    children,
    placement = 'top',
    popper,
    style,
    textStyle,
    arrowStyle,
    ...elementProps
  } = props;

  const tooltip = useMemo(
    () => ({
      placement: transformPlacement(placement),
      arrowStyle,
      popper,
    }),
    [placement, arrowStyle, popper],
  );

  const classes = getStyles(styles, [
    '.tooltip',
    // Wait for rendering (of Overlay) before setting the offset.
    popper && `.bs-tooltip-${tooltip.placement}`,
  ]);
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
