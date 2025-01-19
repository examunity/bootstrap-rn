import React, { useEffect, useMemo, RefObject } from 'react';
import { Platform, findNodeHandle } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Pressable from '../Pressable';
import { ViewRef } from '../View';

type BackdropType = boolean | 'static';
type AutoCloseType = boolean | string;

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

interface BackdropHandlerProps {
  toggleRef?: RefObject<ViewRef | null>;
  dialogRef: RefObject<ViewRef | null>;
  onClose?: () => void;
  autoClose?: AutoCloseType;
  backdrop?: BackdropType;
}

function BackdropHandler(props: BackdropHandlerProps) {
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
      const toggle = toggleRef
        ? // @ts-expect-error web only method for converting to HTMLElement
          (findNodeHandle(toggleRef.current) as HTMLElement)
        : undefined;
      // @ts-expect-error web only method for converting to HTMLElement
      const dialog = findNodeHandle(dialogRef.current) as HTMLElement;

      const handleDialogMouseDown = () => {
        state.waitingForMouseUp = true;
      };

      // Workaround for chrome, because chrome does not fire onMouseDown event
      // for dialog when clicking on the <select> menu.
      const handleDialogMouseUp = () => {
        state.ignoreBackdropClick = true;
      };

      const handleDocumentClick = ({ target }: MouseEvent) => {
        const isDialogClick =
          state.ignoreBackdropClick ||
          (dialog && dialog.contains(target as Node));

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
        if (toggle && (target === toggle || toggle.contains(target as Node))) {
          return;
        }

        handleClose?.();
      };

      const handleDocumentMouseUp = () => {
        if (state.waitingForMouseUp) {
          state.ignoreBackdropClick = true;
        }

        state.waitingForMouseUp = false;
      };

      if (dialog) {
        dialog.addEventListener('mousedown', handleDialogMouseDown);
        dialog.addEventListener('mouseup', handleDialogMouseUp);
      }
      // See https://github.com/necolas/react-native-web/issues/2115
      document.addEventListener('click', handleDocumentClick, true);
      document.addEventListener('mouseup', handleDocumentMouseUp, true);

      return () => {
        if (dialog) {
          dialog.removeEventListener('mousedown', handleDialogMouseDown);
          dialog.removeEventListener('mouseup', handleDialogMouseUp);
        }
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
        handleClose?.();
      }}
      accessible={false}
      importantForAccessibility="no"
    />
  );
}

BackdropHandler.displayName = 'BackdropHandler';

export default BackdropHandler;
