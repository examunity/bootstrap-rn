import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import Text from '../Text';
import getStyles from '../../utils/getStyles';
import v from '../../theme/variables';

const propTypes = { children: PropTypes.node.isRequired };

const styles = StyleSheet.create({
  modalTitle: {
    lineHeight: v.modalTitleLineHeight,
  },
});

function ModalTitle(props) {
  const { children, ...elementProps } = props;

  const classes = getStyles(styles, ['modalTitle']);

  return (
    <Text style={[classes, elementProps.style]} {...elementProps}>
      {children}
    </Text>
  );
}

ModalTitle.propTypes = propTypes;

export default ModalTitle;
