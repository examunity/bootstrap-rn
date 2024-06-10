import React from 'react';
import View from '../View';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';

export type PopoverBodyProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  textStyle?: unknown;
};

const styles = StyleSheet.create({
  '.popover-body': css`
    padding: $popover-body-padding-y $popover-body-padding-x;
  `,
  '.popover-body --text': css`
    color: $popover-body-color;
  `,
});

const PopoverBody = React.forwardRef<ViewRef, PopoverBodyProps>(
  (props, ref) => {
    const { children, style, textStyle, ...elementProps } = props;

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
  },
);

PopoverBody.displayName = 'PopoverBody';

export default PopoverBody;
