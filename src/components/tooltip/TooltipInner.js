import React from 'react';
import PropTypes from 'prop-types';
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
  '.tooltip-inner': css`
    max-width: $tooltip-max-width;
    padding: $tooltip-padding-y $tooltip-padding-x;
    color: $tooltip-color;
    text-align: center;
    background-color: $tooltip-bg;
    border-radius: $tooltip-border-radius;
  `,
});

const TooltipInner = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.tooltip-inner']);

  return (
    <Text {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </Text>
  );
});

TooltipInner.displayName = 'TooltipInner';
TooltipInner.propTypes = propTypes;

export default TooltipInner;
