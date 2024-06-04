import React from 'react';
import View from '../View';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';

export type CardHeaderProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  textStyle?: unknown;
};

const styles = StyleSheet.create({
  '.card-header': css`
    padding: $card-cap-padding-y $card-cap-padding-x;
    background-color: $card-cap-bg;
    border-bottom-width: $card-border-width;
    border-style: solid;
    border-color: $card-border-color;
    border-radius: $card-inner-border-radius $card-inner-border-radius 0 0;
  `,
  '.card-header --text': css`
    margin-bottom: 0; // Removes the default margin-bottom of <hN>
    color: $card-cap-color;
  `,
});

const CardHeader = React.forwardRef<ViewRef, CardHeaderProps>((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.card-header']);

  const textClasses = getStyles(styles, ['.card-header --text']);

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

CardHeader.displayName = 'CardHeader';

export default CardHeader;
