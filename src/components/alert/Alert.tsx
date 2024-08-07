import React from 'react';
import View, { ViewProps, ViewRef } from '../View';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles, each } from '../../utils';
import { THEME_COLORS } from '../../theme/proxies';
import { shiftColor } from '../../theme/functions';
import type { ThemeVariables } from '../../types';

export interface AlertProps extends ViewProps {
  color?: keyof typeof THEME_COLORS;
  dismissible?: boolean;
}

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
      background-color: ${shiftColor(
        value,
        (t: ThemeVariables) => t['alert-bg-scale'],
      )};
      border-color: ${shiftColor(
        value,
        (t: ThemeVariables) => t['alert-border-scale'],
      )};
    `,
    [`.alert-${state} --text`]: css`
      color: ${shiftColor(
        value,
        (t: ThemeVariables) => t['alert-color-scale'],
      )};
    `,
  })),
  /* '.alert-dismissible': {
    // TODO
  }, */
});

const Alert = React.forwardRef<ViewRef, AlertProps>((props, ref) => {
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

export default Alert;
