import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import getStyles from '../../utils/getStyles';
import v from '../../theme/variables';
import View from '../View';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
// import ModalTitle from './ModalTitle';

// const MODAL_SIZES = ['sm', 'lg', 'xl'];

const propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  // size: PropTypes.oneOf(MODAL_SIZES),
  // backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
  // scrollable: PropTypes.bool,
  // centered: PropTypes.bool,
  // onToggle: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modal: {
    margin: 'auto',
    width: v.modalSm,
    backgroundColor: v.modalContentBg,
    borderRadius: v.modalContentBorderRadius,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

const ModalComponent = (props) => {
  const { children, visible, ...elementProps } = props;
  const [modalVisible, setModalVisible] = useState(visible);

  const classes = getStyles(styles, ['modal']);
  return (
    <Modal
      animationType="slide"
      transparent="true"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[classes, elementProps.style, styles.centeredView]}>
        {children}
      </View>
    </Modal>
  );
};

ModalComponent.displayName = 'Modal';
ModalComponent.propTypes = propTypes;

ModalComponent.Header = ModalHeader;
ModalComponent.Body = ModalBody;
ModalComponent.Footer = ModalFooter;
// Modal2.Title = ModalTitle;

export default ModalComponent;
