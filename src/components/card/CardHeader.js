import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import TextStyleProvider from '../../style/TextStyleProvider';
import View from '../View';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
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
  '.card-header-text': css`
    color: $card-cap-color;
  `,
});

function CardHeader(props) {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.card-header']);

  const textClasses = getStyles(styles, ['.card-header-text']);

  return (
    <View {...elementProps} style={[classes, style]}>
      <TextStyleProvider style={textClasses}>{children}</TextStyleProvider>
    </View>
  );
}

CardHeader.propTypes = propTypes;

export default CardHeader;
