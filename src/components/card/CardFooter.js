import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

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

const CardFooter = React.forwardRef((props, ref) => {
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
CardFooter.propTypes = propTypes;

export default CardFooter;
