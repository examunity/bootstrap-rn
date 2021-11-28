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

const propTypes = {children: PropTypes.node.isRequired,};

/*
.card-footer {
  padding: $card-cap-padding-y $card-cap-padding-x;
  color: $card-cap-color;
  background-color: $card-cap-bg;
  border-top: $card-border-width solid $card-border-color;

  &:last-child {
    @include border-radius(0 0 $card-inner-border-radius $card-inner-border-radius);
  }
}
*/

const styles = StyleSheet.create({
    cardFooter: {
    color: null,
    },
  });

  function CardFooter(props) {
    const {
      children,
      ...elementProps
    } = props;
  
    const classes = getStyles(styles, [
      'CardFooter',
    ]);
    
    return (
      <View style={[classes, elementProps.style]} {...elementProps}>
        <TextStyleContext.Provider>
          {children}
        </TextStyleContext.Provider>
      </View>
    );
  }



CardFooter.propTypes = propTypes;

export default CardFooter;