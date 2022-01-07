import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BaseModal, StyleSheet as StyleSheet2 } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import View from '../View';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
// import ModalTitle from './ModalTitle';

// const MODAL_SIZES = ['sm', 'lg', 'xl'];

const propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // size: PropTypes.oneOf(MODAL_SIZES),
  // backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
  // scrollable: PropTypes.bool,
  // centered: PropTypes.bool,
  // onToggle: PropTypes.func.isRequired,
};

const styles2 = StyleSheet2.create({
  modalView2: {
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

const styles = StyleSheet.create({
  '.modal-dialog': css`
    display: flex;
    min-width: 0;
    flex: 1;
    justify-content: center;
    align-items: center;
  `,
  '.modal-content': css`
    shadow-color: $black;
    display: flex;
    min-width: 300;

    color: $modal-content-color;
    background-color: $modal-content-bg;
    border-color: $modal-content-border-color;
    border-width: $modal-content-border-width;
    border-radius: $modal-content-border-radius $modal-content-border-radius
      $modal-content-inner-border-radius $modal-content-inner-border-radius;
  `,
});

const Modal = (props) => {
  const { children, style, visible, ...elementProps } = props;

  const modalDialogClasses = getStyles(styles, ['.modal-dialog']);
  const modalContentClasses = getStyles(styles, ['.modal-content']);
  return (
    <BaseModal animationType="slide" transparent visible={visible}>
      <View style={[modalDialogClasses, style]}>
        <View
          {...elementProps}
          style={[modalContentClasses, style, styles2.modalView2]}
        >
          {children}
        </View>
      </View>
    </BaseModal>
  );
};

Modal.displayName = 'Modal';
Modal.propTypes = propTypes;

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
