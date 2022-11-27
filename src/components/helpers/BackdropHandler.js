import React, { useEffect, useMemo } from 'react';
import { Platform, findNodeHandle } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Pressable from '../Pressable';

const propTypes = {
  toggleRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  dialogRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onClose: PropTypes.func,
  autoClose: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['inside', 'outside']),
  ]),
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

const initialState = {
  waitingForMouseUp: false,
  ignoreBackdropClick: false,
};

const BackdropHandler = (props) => {
  const {
    toggleRef,
    dialogRef,
    onClose: handleClose,
    backdrop = true,
    autoClose = 'outside',
  } = props;

  if (Platform.OS === 'web') {
    const state = useMemo(() => initialState, []);

    useEffect(() => {
      const toggle = toggleRef ? findNodeHandle(toggleRef.current) : undefined;
      const dialog = findNodeHandle(dialogRef.current);

      const handleDialogMouseDown = () => {
        state.waitingForMouseUp = true;
      };

      // Workaround for chrome, because chrome does not fire onMouseDown event
      // for dialog when clicking on the <select> menu.
      const handleDialogMouseUp = () => {
        state.ignoreBackdropClick = true;
      };

      const handleDocumentClick = ({ target }) => {
        const isDialogClick =
          state.ignoreBackdropClick || dialog.contains(target);

        if (backdrop === 'static' || autoClose === false) {
          return;
        }

        // Click outside -> return if autoClose is inside.
        if (!isDialogClick && autoClose === 'inside') {
          return;
        }

        // Click inside / on dialog -> return if autoClose is outside.
        if (isDialogClick) {
          state.ignoreBackdropClick = false;

          if (autoClose === 'outside') {
            return;
          }
        }

        // Click on toggle -> return always.
        if (toggle && (target === toggle || toggle.contains(target))) {
          return;
        }

        handleClose();
      };

      const handleDocumentMouseUp = () => {
        if (state.waitingForMouseUp) {
          state.ignoreBackdropClick = true;
        }

        state.waitingForMouseUp = false;
      };

      dialog.addEventListener('mousedown', handleDialogMouseDown);
      dialog.addEventListener('mouseup', handleDialogMouseUp);
      // See https://github.com/necolas/react-native-web/issues/2115
      document.addEventListener('click', handleDocumentClick, true);
      document.addEventListener('mouseup', handleDocumentMouseUp, true);

      return () => {
        dialog.addEventListener('mousedown', handleDialogMouseDown);
        dialog.addEventListener('mouseup', handleDialogMouseUp);
        document.removeEventListener('click', handleDocumentClick, true);
        document.removeEventListener('mouseup', handleDocumentMouseUp, true);
      };
    }, [backdrop, autoClose]);

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
