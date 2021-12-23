import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';
import Text from '../Text';
import getStyles from '../../utils/getStyles';
import v from '../../theme/variables';

const propTypes = { children: PropTypes.node.isRequired };

const styles = StyleSheet.create({
  modalHeader: {
    paddingHorizontal: v.modalHeaderPaddingX,
    paddingVertical: v.modalHeaderPaddingY,
    borderBottomWidth: v.cardBorderWidth,
    borderStyle: 'solid',
    borderColor: v.modalHeaderBorderColor,
  },
});

function ModalHeader(props) {
  const { children, ...elementProps } = props;

  const classes = getStyles(styles, ['modalHeader']);

  return (
    <View style={[classes, elementProps.style]} {...elementProps}>
      <Text>{children}</Text>
    </View>
  );
}

ModalHeader.propTypes = propTypes;

export default ModalHeader;
