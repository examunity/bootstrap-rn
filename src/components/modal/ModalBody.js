import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';
import getStyles from '../../utils/getStyles';
import v from '../../theme/variables';

const propTypes = { children: PropTypes.node.isRequired };

const styles = StyleSheet.create({
  modalBody: {
    paddingVertical: v.cardSpacerY,
    paddingHorizontal: v.cardSpacerX,
  },
});

function ModalBody(props) {
  const { children, ...elementProps } = props;
  const classes = getStyles(styles, ['modalBody']);
  return (
    <View style={[classes, elementProps.style]} {...elementProps}>
      {children}
    </View>
  );
}

ModalBody.propTypes = propTypes;

export default ModalBody;
