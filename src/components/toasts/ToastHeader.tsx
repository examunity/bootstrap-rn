import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View, { ViewProps, ViewRef } from '../View';
import { subtract } from '../../theme/functions';
import { getStyles } from '../../utils';
import type { ThemeVariables } from '../../types';

export interface ToastHeaderProps extends ViewProps {}

const styles = StyleSheet.create({
  '.toast-header': css`
    display: flex;
    flex-direction: row; // added for bootstrap-rn
    align-items: center;
    padding: $toast-padding-y $toast-padding-x;
    background-color: $toast-header-background-color;
    // background-clip: padding-box;
    border-bottom-width: $toast-border-width;
    border-style: solid;
    border-color: $toast-header-border-color;
    border-top-left-radius: ${subtract(
      (t: ThemeVariables) => t['toast-border-radius'],
      (t: ThemeVariables) => t['toast-border-width'],
    )};
    border-top-right-radius: ${subtract(
      (t: ThemeVariables) => t['toast-border-radius'],
      (t: ThemeVariables) => t['toast-border-width'],
    )};
  `,
  '.toast-header --text': css`
    color: $toast-header-color;
  `,
});

const ToastHeader = React.forwardRef<ViewRef, ToastHeaderProps>(
  (props, ref) => {
    const { children, style, textStyle, ...elementProps } = props;

    const classes = getStyles(styles, ['.toast-header']);

    const textClasses = getStyles(styles, ['.toast-header --text']);

    return (
      <View
        {...elementProps}
        ref={ref}
        style={[classes, style]}
        textStyle={[textClasses, textStyle]}
      >
        {children}
      </View>
    );
  },
);

ToastHeader.displayName = 'ToastHeader';

export default ToastHeader;
