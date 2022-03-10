import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import View from '../View';
import StyleSheet from '../../style/StyleSheet';
import { getStyles, transformPlacement } from '../../utils';
import css from '../../style/css';
import TooltipArrow from './TooltipArrow';
import TooltipInner from './TooltipInner';
import TooltipContext from './TooltipContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.string,
  popper: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  arrowStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.tooltip': css`
    position: absolute;
    z-index: $zindex-tooltip;
    // display: block;
    margin: $tooltip-margin;
    // opacity: 0;
  `,
  '.tooltip-text': css`
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

const Tooltip = React.forwardRef((props, ref) => {
  const {
    children,
    placement = 'top',
    popper,
    style,
    textStyle,
    arrowStyle,
    ...elementProps
  } = props;

  const tooltip = {
    placement: transformPlacement(placement),
    arrowStyle,
    popper,
  };

  const classes = getStyles(styles, [
    '.tooltip',
    // Wait for rendering (of Overlay) before setting the offset.
    popper && `.bs-tooltip-${tooltip.placement}`,
  ]);
  const textClasses = getStyles(styles, ['.tooltip-text']);

  // Accessiblity role tooltip is only supported on web.
  const role = Platform.OS === 'web' ? 'tooltip' : null;

  return (
    <View
      {...elementProps}
      ref={ref}
      accessibilityRole={role}
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
Tooltip.propTypes = propTypes;

Tooltip.Arrow = TooltipArrow;
Tooltip.Inner = TooltipInner;

export default Tooltip;
