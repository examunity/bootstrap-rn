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
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0; // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
  height: $card-height;
  word-wrap: break-word;
  background-color: $card-bg;
  background-clip: border-box;
  border: $card-border-width solid $card-border-color;
  @include border-radius($card-border-radius);
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
        borderRadius: v.borderRadius, 
        borderWidth: 1,
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
      color = 'primary',
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