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
  '.card-body': css`
    flex: 1 1 auto;
    padding: $card-spacer-y $card-spacer-x;
  `,
  '.card-body-text': css`
    color: $card-color;
  `,
});

function CardBody(props) {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.card-body']);

  const textClasses = getStyles(styles, [`.card-body-text`]);

  return (
    <View {...elementProps} style={[classes, style]}>
      <TextStyleProvider value={textClasses}>{children}</TextStyleProvider>
    </View>
  );
}

CardBody.propTypes = propTypes;

export default CardBody;
