import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View, { ViewProps, ViewRef } from '../View';
import { getStyles } from '../../utils';

export interface ToastBodyProps extends ViewProps {}

const styles = StyleSheet.create({
  '.toast-body': css`
    padding: $toast-padding-x; // apply to both vertical and horizontal
  `,
  '.toast-body --text': css`
    @include platform(web) {
      word-wrap: break-word;
    }
  `,
});

function ToastBody(props: ToastBodyProps & React.RefAttributes<ViewRef>) {
  const { ref, children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.toast-body']);

  const textClasses = getStyles(styles, ['.toast-body --text']);

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
}

export default ToastBody;
