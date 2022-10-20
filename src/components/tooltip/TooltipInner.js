import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import View from '../View';
import Text from '../Text';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.tooltip-inner': css`
    max-width: $tooltip-max-width;
    padding: $tooltip-padding-y $tooltip-padding-x;
    background-color: $tooltip-bg;
    border-radius: $tooltip-border-radius;
  `,
  '.tooltip-inner --text': css`
    color: $tooltip-color;
    text-align: center;
  `,
});

const TooltipInner = React.forwardRef((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.tooltip-inner']);
  const textClasses = getStyles(styles, ['.tooltip-inner --text']);

  // composite component
  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      <Text style={[textClasses, textStyle]}>{children}</Text>
    </View>
  );
});

TooltipInner.displayName = 'TooltipInner';
TooltipInner.propTypes = propTypes;

export default TooltipInner;
