import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';
import TextStyleContext from '../../style/TextStyleContext';
import getStyles from '../../utils/getStyles';
import v from '../../theme/variables';

const propTypes = { children: PropTypes.node.isRequired };

const styles = StyleSheet.create({
  cardBody: {
    display: 'flex',
    paddingHorizontal: v.cardSpacerX,
    paddingVertical: v.cardSpacerY,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    color: v.cardColor,
  },
});

function CardBody(props) {
  const { children, ...elementProps } = props;

  const classes = getStyles(styles, ['cardBody']);

  return (
    <View style={[classes, elementProps.style]} {...elementProps}>
      <TextStyleContext.Provider>{children}</TextStyleContext.Provider>
    </View>
  );
}

CardBody.propTypes = propTypes;

export default CardBody;
