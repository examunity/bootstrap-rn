import React, { useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FocusScope } from '@react-aria/focus';
import type { ViewRef } from '../View';
import Context from '../../Context';

type DialogProps = {
  children: React.ReactNode;
  contentRef: React.RefObject<ViewRef | null>;
  onClose?: () => void;
  backdrop: boolean | 'static';
  backdropElement: React.ReactNode;
  scroll?: boolean;
};

const initialState = {
  waitingForMouseUp: false,
  ignoreBackdropClick: false,
};

function Dialog({
  children,
  contentRef,
  onClose: handleClose,
  backdrop,
  backdropElement,
  scroll = false,
}: DialogProps) {
  const context = useContext(Context);

  // Handle scrollbars
  useEffect(() => {
    if (!context || scroll) {
      return undefined;
    }

    context.scrollbars.hide();

    return () => {
      context.scrollbars.show();
    };
  }, [context, scroll]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle outside click
  const state = useRef(initialState);

  useEffect(() => {
    const content = contentRef.current as HTMLElement | null;

    const handleContentMouseDown = () => {
      state.current.waitingForMouseUp = true;
    };

    // Workaround for chrome, because chrome does not fire onMouseDown event
    // for dialog when clicking on the <select> menu.
    const handleContentMouseUp = () => {
      state.current.ignoreBackdropClick = true;
    };

    const handleDocumentClick = ({ target }: MouseEvent) => {
      if (backdrop !== true) {
        return;
      }

      const isContentClick =
        state.current.ignoreBackdropClick ||
        (content && content.contains(target as Node));

      if (isContentClick) {
        state.current.ignoreBackdropClick = false;
        return;
      }

      handleClose?.();
    };

    const handleDocumentMouseUp = () => {
      if (state.current.waitingForMouseUp) {
        state.current.ignoreBackdropClick = true;
      }

      state.current.waitingForMouseUp = false;
    };

    if (content) {
      content.addEventListener('mousedown', handleContentMouseDown);
      content.addEventListener('mouseup', handleContentMouseUp);
    }

    // See https://github.com/necolas/react-native-web/issues/2115
    document.addEventListener('click', handleDocumentClick, true);
    document.addEventListener('mouseup', handleDocumentMouseUp, true);

    return () => {
      if (content) {
        content.removeEventListener('mousedown', handleContentMouseDown);
        content.removeEventListener('mouseup', handleContentMouseUp);
      }

      document.removeEventListener('click', handleDocumentClick, true);
      document.removeEventListener('mouseup', handleDocumentMouseUp, true);
    };
  }, [backdrop]);

  return createPortal(
    <>
      {backdrop && backdropElement}
      <FocusScope contain restoreFocus>
        {children}
      </FocusScope>
    </>,
    document.body,
  );
}

export default Dialog;
