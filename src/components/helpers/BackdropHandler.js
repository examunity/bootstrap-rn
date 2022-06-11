import React, { useEffect, useRef } from 'react';
import { Platform, findNodeHandle } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Pressable from '../Pressable';

const propTypes = {
  dialogRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onClose: PropTypes.func,
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
};

const styles = StyleSheet.create({
  handler: css`
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    flex-grow: 1;
  `,
});

const BackdropHandler = (props) => {
  const { dialogRef, onClose: handleClose, backdrop = true } = props;

  if (Platform.OS === 'web') {
    const waitingForMouseUp = useRef(false);
    const ignoreBackdropClick = useRef(false);

    useEffect(() => {
      const dialog = findNodeHandle(dialogRef.current);

      const handleDialogMouseDown = () => {
        waitingForMouseUp.current = true;
      };

      const handleDocumentClick = () => {
        if (backdrop === 'static') {
          return;
        }

        if (ignoreBackdropClick.current) {
          ignoreBackdropClick.current = false;
          return;
        }

        handleClose();
      };

      const handleDocumentMouseUp = () => {
        if (waitingForMouseUp.current) {
          ignoreBackdropClick.current = true;
        }

        waitingForMouseUp.current = false;
      };

      dialog.addEventListener('mousedown', handleDialogMouseDown);
      document.addEventListener('click', handleDocumentClick);
      document.addEventListener('mouseup', handleDocumentMouseUp);

      return () => {
        dialog.addEventListener('mousedown', handleDialogMouseDown);
        document.removeEventListener('click', handleDocumentClick);
        document.removeEventListener('mouseup', handleDocumentMouseUp);
      };
    }, [backdrop]);

    return null;
  }

  if (backdrop !== true) {
    return null;
  }

  return (
    <Pressable
      style={styles.handler}
      onPress={() => {
        handleClose();
      }}
      accessible={false}
      importantForAccessibility="no"
    />
  );
};

BackdropHandler.displayName = 'BackdropHandler';
BackdropHandler.propTypes = propTypes;

export default BackdropHandler;
