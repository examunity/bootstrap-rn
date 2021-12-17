import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';
import TextStyleContext from '../../style/TextStyleContext';
import getStyles from '../../utils/getStyles';
import v from '../../theme/variables';

const propTypes = { children: PropTypes.node.isRequired };
/*
.card-footer {
  &:last-child {
    @include border-radius(0 0 $card-inner-border-radius $card-inner-border-radius);
  }
}
*/
const styles = StyleSheet.create({
  cardFooter: {
    paddingVertical: v.cardCapPaddingY,
    paddingHorizontal: v.cardCapPaddingX,
    color: v.cardCapColor,
    backgroundColor: v.cardCapBg,
    borderTopWidth: v.cardBorderWidth,
    borderStyle: 'solid',
    borderColor: v.cardBorderColor,
  },
});

function CardFooter(props) {
  const { children, ...elementProps } = props;

  const classes = getStyles(styles, ['cardFooter']);

  return (
    <View style={[classes, elementProps.style]} {...elementProps}>
      <TextStyleContext.Provider>{children}</TextStyleContext.Provider>
    </View>
  );
}

CardFooter.propTypes = propTypes;

export default CardFooter;
