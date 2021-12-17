import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';
import getStyles from '../../utils/getStyles';
import v from '../../theme/variables';
import CardBody from './CardBody';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';

const propTypes = {
  children: PropTypes.node.isRequired,
};
/*
.card {
  word-wrap: break-word;
  background-clip: border-box;
  @include box-shadow($card-box-shadow);
*/

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    height: v.cardHeight,
    backgroundColor: v.cardBg,
    borderWidth: v.cardBorderWidth,
    borderStyle: 'solid',
    borderColor: v.cardBorderColor,
    borderRadius: v.cardBorderRadius,
  },
});

function Card(props) {
  const { children, ...elementProps } = props;

  const classes = getStyles(styles, ['card']);

  return (
    <View style={[classes, elementProps.style]} {...elementProps}>
      {children}
    </View>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

Card.propTypes = propTypes;

export default Card;
