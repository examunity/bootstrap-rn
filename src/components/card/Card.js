import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';
import CardBody from './CardBody';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
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

const Card = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.card']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </View>
  );
});

Card.displayName = 'Card';
Card.propTypes = propTypes;

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
