import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';
import getStyles from '../../utils/getStyles';
import v from '../../theme/variables';

const propTypes = { children: PropTypes.node.isRequired };

const styles = StyleSheet.create({
  modalFooter: {
    paddingHorizontal: v.modalHeaderPaddingX,
    paddingVertical: v.modalHeaderPaddingY,
    borderTopWidth: v.modalFooterBorderWidth,
    borderStyle: 'solid',
    borderColor: v.modalFooterBorderColor,
  },
});

function ModalFooter(props) {
  const { children, ...elementProps } = props;

  const classes = getStyles(styles, ['modalFooter']);

  return (
    <View style={[classes, elementProps.style]} {...elementProps}>
      {children}
    </View>
  );
}

ModalFooter.propTypes = propTypes;

export default ModalFooter;
