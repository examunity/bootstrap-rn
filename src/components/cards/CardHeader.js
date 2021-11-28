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
.card-header {
  padding: $card-cap-padding-y $card-cap-padding-x;
  margin-bottom: 0; // Removes the default margin-bottom of <hN>
  color: $card-cap-color;
  background-color: $card-cap-bg;
  border-bottom: $card-border-width solid $card-border-color;

  &:first-child {
    @include border-radius($card-inner-border-radius $card-inner-border-radius 0 0);
  }
}
*/

const styles = StyleSheet.create({
    cardHeader: {
    display: 'flex',
    paddingHorizontal: v.cardSpacerX,
    paddingVertical: v.cardSpacerY,
    color: null,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    },
  });

  function CardHeader(props) {
    const {
      children,
      ...elementProps
    } = props;
  
    const classes = getStyles(styles, [
      'cardHeader',
    ]);
    
    return (
      <View style={[classes, elementProps.style]} {...elementProps}>
        <TextStyleContext.Provider>
          {children}
        </TextStyleContext.Provider>
      </View>
    );
  }



CardHeader.propTypes = propTypes;

export default CardHeader;