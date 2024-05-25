import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles, each } from '../../utils';
import { THEME_COLORS, ThemeColorsType } from '../../theme/proxies';
import { shiftColor } from '../../theme/functions';

export type AlertProps = {
  children: React.ReactNode;
  color?: ThemeColorsType;
  dismissible?: boolean;
  style?: React.CSSProperties;
  textStyle?: any;
  [key: string]: any;
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
  ...each(THEME_COLORS, (state: string, value: string) => ({
    [`.alert-${state}`]: css`
      background-color: ${shiftColor(value, (t: any) => t['alert-bg-scale'])};
      border-color: ${shiftColor(value, (t: any) => t['alert-border-scale'])};
    `,
    [`.alert-${state} --text`]: css`
      color: ${shiftColor(value, (t: any) => t['alert-color-scale'])};
    `,
  })),
  '.alert-dismissible': {
    // TODO
  },
});

const Alert = React.forwardRef<any, AlertProps>((props, ref) => {
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
    `.alert-${String(color)}`,
    dismissible && '.alert-dismissible',
  ]);

  const textClasses = getStyles(styles, [`.alert-${String(color)} --text`]);

  return (
    <View
      {...elementProps}
      ref={ref}
      role="alert" // causing no overload match this call
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {children}
    </View>
  );
});

Alert.displayName = 'Alert';

export default Alert;
