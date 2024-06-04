import React from 'react';
import View from '../View';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';

export type CardBodyProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  textStyle?: unknown;
};

const styles = StyleSheet.create({
  '.card-body': css`
    // flex: 1 1 auto;
    padding: $card-spacer-y $card-spacer-x;
  `,
  '.card-body --text': css`
    color: $card-color;
  `,
});

const CardBody = React.forwardRef<ViewRef, CardBodyProps>((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.card-body']);

  const textClasses = getStyles(styles, [`.card-body --text`]);

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

CardBody.displayName = 'CardBody';

export default CardBody;
