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
  '.card-header': css`
    padding: $card-cap-padding-y $card-cap-padding-x;
    margin-bottom: 0; // Removes the default margin-bottom of <hN>
    background-color: $card-cap-bg;
    border-bottom-width: $card-border-width;
    border-style: solid;
    border-color: $card-border-color;
    border-radius: $card-inner-border-radius $card-inner-border-radius 0 0;
  `,
  '.card-header --text': css`
    color: $card-cap-color;
  `,
});

const CardHeader = React.forwardRef((props, ref) => {
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
CardHeader.propTypes = propTypes;

export default CardHeader;
