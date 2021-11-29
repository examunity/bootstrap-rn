import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import View from './../View';
import TextStyleContext from '../../style/TextStyleContext';
import each from '../../utils/each';
import getStyles from '../../utils/getStyles';
import ucfirst from '../../utils/ucfirst';
import v from '../../theme/variables';
import { shiftColor } from '../../utils/functions';
import CardBody from './CardBody';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(Object.keys(v.themeColors)),
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
    borderStyle: 'solid',
    borderRadius: v.cardBorderRadius,
    borderWidth: v.cardBorderWidth,
  },
  ...each(v.themeColors, (state, value) => ({
    [`card${ucfirst(state)}`]: {
      backgroundColor: shiftColor(v.alertBgScale, value),
      borderColor: shiftColor(v.alertBorderScale, value),
    },
  })),

});

function Card(props) {
  const {
    color = 'null',
    children,
    ...elementProps
  } = props;

  const classes = getStyles(styles, [
    'card',
    `card${ucfirst(color)}`,
  ]);

  const textClasses = getStyles(styles, [`card${ucfirst(color)}Text`]);

  return (
    <View style={[classes, elementProps.style]} {...elementProps}>
      <TextStyleContext.Provider value={textClasses}>
        {children}
      </TextStyleContext.Provider>
    </View>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

Card.propTypes = propTypes;

export default Card;