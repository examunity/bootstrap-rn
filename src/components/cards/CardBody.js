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
.card-body {
  // Enable `flex-grow: 1` for decks and groups so that card blocks take up
  // as much space as possible, ensuring footers are aligned to the bottom.
  flex: 1 1 auto;
  padding: $card-spacer-y $card-spacer-x;
  color: $card-color;
}
*/

const styles = StyleSheet.create({
    cardBody: {
    display: 'flex',
    paddingHorizontal: v.cardSpacerX,
    paddingVertical: v.cardSpacerY,
    color: null,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    },
  });

  function CardBody(props) {
    const {
      children,
      ...elementProps
    } = props;
  
    const classes = getStyles(styles, [
      'cardBody',
    ]);
    
    return (
      <View style={[classes, elementProps.style]} {...elementProps}>
        <TextStyleContext.Provider>
          {children}
        </TextStyleContext.Provider>
      </View>
    );
  }



CardBody.propTypes = propTypes;

export default CardBody;