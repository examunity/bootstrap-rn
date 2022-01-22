import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import View from '../View';
import Text from '../Text';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.tooltip': css`
    // position: absolute;
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
  '.tooltip-inner': css`
    max-width: $tooltip-max-width;
    padding: $tooltip-padding-y $tooltip-padding-x;
    color: $tooltip-color;
    text-align: center;
    background-color: $tooltip-bg;
    border-radius: $tooltip-border-radius;
  `,
});

const Tooltip = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.tooltip']);
  const innerClasses = getStyles(styles, ['.tooltip-text', '.tooltip-inner']);

  // Accessiblity role tooltip is only supported on web.
  const role = Platform.OS === 'web' ? 'tooltip' : null;

  return (
    <View {...elementProps} ref={ref} accessibilityRole={role} style={classes}>
      <Text style={[innerClasses, style]}>{children}</Text>
    </View>
  );
});

Tooltip.displayName = 'Tooltip';
Tooltip.propTypes = propTypes;

export default Tooltip;
