import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';
import TextStyleContext from '../../style/TextStyleContext';
import getStyles from '../../utils/getStyles';
import v from '../../theme/variables';

const propTypes = { children: PropTypes.node.isRequired };
/*
.card-header {
  &:first-child {
    @include border-radius($card-inner-border-radius $card-inner-border-radius 0 0);
  }
}
*/
const styles = StyleSheet.create({
  cardHeader: {
    paddingHorizontal: v.cardCapPaddingX,
    paddingVertical: v.cardCapPaddingY,
    marginBottom: 0,
    color: v.cardCapColor,
    backgroundColor: v.cardCapBg,
    borderBottomWidth: v.cardBorderWidth,
    borderStyle: 'solid',
    borderColor: v.cardBorderColor,
  },
});

function CardHeader(props) {
  const { children, ...elementProps } = props;

  const classes = getStyles(styles, ['cardHeader']);

  return (
    <View style={[classes, elementProps.style]} {...elementProps}>
      <TextStyleContext.Provider>{children}</TextStyleContext.Provider>
    </View>
  );
}

CardHeader.propTypes = propTypes;

export default CardHeader;
