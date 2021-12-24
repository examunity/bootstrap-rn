import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BaseModal } from 'react-native';
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal: {
    borderRadius: v.modalContentBorderRadius,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

const Modal = (props) => {
  const { children, visible, ...elementProps } = props;

  const classes = getStyles(styles, ['modal']);
  return (
    <BaseModal
      animationType="slide"
      transparent="true"
      visible={visible}
      // onRequestClose={() => {
      //   setModalVisible(!modalVisible);
      // }}
    >
      <View style={[classes, elementProps.style]}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </BaseModal>
  );
};

Modal.displayName = 'Modal';
Modal.propTypes = propTypes;

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
// Modal2.Title = ModalTitle;

export default Modal;
