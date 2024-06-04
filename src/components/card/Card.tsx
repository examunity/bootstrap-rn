import React from 'react';
import View from '../View';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';
import CardBody from './CardBody';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';

export type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const styles = StyleSheet.create({
  '.card': css`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    height: $card-height;
    // word-wrap: break-word;
    background-color: $card-bg;
    // background-clip: border-box;
    border: $card-border-width solid $card-border-color;
    border-radius: $card-border-radius;
    // @include box-shadow($card-box-shadow);
  `,
});

const Card = React.forwardRef<ViewRef, CardProps>((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.card']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </View>
  );
});

Card.displayName = 'Card';

export default Object.assign(Card, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
