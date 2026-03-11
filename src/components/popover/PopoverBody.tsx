import React from 'react';
import View, { ViewProps, ViewRef } from '../View';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';

export interface PopoverBodyProps extends ViewProps {}

const styles = StyleSheet.create({
  '.popover-body': css`
    padding: $popover-body-padding-y $popover-body-padding-x;
  `,
  '.popover-body --text': css`
    color: $popover-body-color;
  `,
});

function PopoverBody(props: PopoverBodyProps & React.RefAttributes<ViewRef>) {
  const { ref, children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.popover-body']);

  const textClasses = getStyles(styles, ['.popover-body --text']);

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

export default PopoverBody;
