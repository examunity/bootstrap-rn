import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles, each } from '../../utils';
import { THEME_COLORS } from '../../theme/proxies';
import { shiftColor } from '../../theme/functions';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(Object.keys(THEME_COLORS)),
  dismissible: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.alert': css`
    position: relative;
    padding: $alert-padding-y $alert-padding-x;
    margin-bottom: $alert-margin-bottom;
    background-color: transparent;
    border: $alert-border-width solid transparent;
    border-radius: $alert-border-radius;
  `,
  ...each(THEME_COLORS, (state, value) => ({
    [`.alert-${state}`]: css`
      background-color: ${shiftColor(value, (t) => t['alert-bg-scale'])};
      border-color: ${shiftColor(value, (t) => t['alert-border-scale'])};
    `,
    [`.alert-${state} --text`]: css`
      color: ${shiftColor(value, (t) => t['alert-color-scale'])};
    `,
  })),
  '.alert-dismissible': {
    // TODO
  },
});

const Alert = React.forwardRef((props, ref) => {
  const {
    children,
    color = 'primary',
    dismissible = false,
    style,
    textStyle,
    ...elementProps
  } = props;

  const classes = getStyles(styles, [
    '.alert',
    `.alert-${color}`,
    dismissible && '.alert-dismissible',
  ]);

  const textClasses = getStyles(styles, [`.alert-${color} --text`]);

  return (
    <View
      {...elementProps}
      ref={ref}
      role="alert"
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {children}
    </View>
  );
});

Alert.displayName = 'Alert';
Alert.propTypes = propTypes;

export default Alert;
