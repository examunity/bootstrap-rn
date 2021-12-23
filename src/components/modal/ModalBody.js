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
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    paddingVertical: v.cardSpacerY,
    paddingHorizontal: v.cardSpacerX,
  },
  cardBodyText: {
    color: v.cardColor,
  },
});

function ModalBody(props) {
  const { children, ...elementProps } = props;

  const classes = getStyles(styles, ['cardBody']);

  const textClasses = getStyles(styles, [`cardBodyText`]);

  return (
    <View style={[classes, elementProps.style]} {...elementProps}>
      <TextStyleContext.Provider value={textClasses}>
        {children}
      </TextStyleContext.Provider>
    </View>
  );
}

ModalBody.propTypes = propTypes;

export default ModalBody;
