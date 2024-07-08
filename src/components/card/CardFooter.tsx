import React from 'react';
import View, { ViewProps, ViewRef } from '../View';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';

export interface CardFooterProps extends ViewProps {}

const styles = StyleSheet.create({
  '.card-footer': css`
    padding: $card-cap-padding-y $card-cap-padding-x;
    background-color: $card-cap-bg;
    border-top-width: $card-border-width;
    border-style: solid;
    border-color: $card-border-color;
    border-radius: 0 0 $card-inner-border-radius $card-inner-border-radius;
  `,
  '.card-footer --text': css`
    color: $card-cap-color;
  `,
});

const CardFooter = React.forwardRef<ViewRef, CardFooterProps>((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.card-footer']);

  const textClasses = getStyles(styles, ['.card-footer --text']);

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
});

CardFooter.displayName = 'CardFooter';

export default CardFooter;
