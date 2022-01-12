import React from 'react';
import { Modal } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  '.form-select-dialog': css`
    position: absolute;
    background-color: $white;
    width: 100%;
    align-items: center;
    border-top-width: $border-width;
    border-top-color: rgba($black, 0.65);
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    bottom: 0;
    padding: 1rem;
  `,
  '.form-select-dialog-backdrop': css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $black;
    opacity: 0.5;
  `,
});

const PickerDialog = React.forwardRef((props, ref) => {
  const { children, visible } = props;

  const backdropClasses = getStyles(styles, ['.form-select-dialog-backdrop']);
  const classes = getStyles(styles, ['.form-select-dialog']);

  return (
    <Modal ref={ref} visible={visible} transparent>
      <View style={backdropClasses} />
      <View style={classes}>{children}</View>
    </Modal>
  );
});

PickerDialog.displayName = 'PickerDialog';
PickerDialog.propTypes = propTypes;

export default PickerDialog;
