import React, { useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FocusScope } from '@react-aria/focus';
import type { ViewRef } from '../View';
import Context from '../../Context';

type DialogProps = {
  children: React.ReactNode;
  dialogRef: React.RefObject<ViewRef | null>;
  backgroundRef: React.RefObject<ViewRef | null>;
  onClose?: () => void;
  backdrop: boolean | 'static';
  backdropElement: React.ReactNode;
  scroll?: boolean;
};

function Dialog({
  children,
  dialogRef,
  backgroundRef,
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
    const dialog = dialogRef.current as HTMLDivElement | null;

    if (!dialog) {
      return undefined;
    }

    // Auto-focus dialog element
    dialog.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose?.();
      }
    };

    dialog.addEventListener('keydown', handleKeyDown);

    return () => {
      dialog.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  // Handle outside click
  const state = useRef<{
    waitingForMouseUp: boolean;
    handleClick: ((event: MouseEvent) => void) | null;
  }>({
    waitingForMouseUp: false,
    handleClick: null,
  });

  useEffect(() => {
    const ref = backgroundRef.current as HTMLDivElement | null;

    // @ts-expect-error getScrollableNode exists on web only
    const isScrollView = typeof ref?.getScrollableNode === 'function';

    // If the ref refers to a scroll view, we need the first child, otherwise the ref itself.
    const background = isScrollView ? ref?.firstElementChild : ref;

    if (!background) {
      return undefined;
    }

    const handleMouseDown = (event: MouseEvent) => {
      // It might be that a click starts inside the window and ends outside the window, so that
      // only the on mouse down event is dispatched and we need to remove the click listener
      // before the next click event is dispatched.
      if (state.current.waitingForMouseUp && state.current.handleClick) {
        background.removeEventListener('click', state.current.handleClick);
      }

      // A bad trick to segregate clicks that may start inside dialog but end outside, and avoid
      // listen to scrollbar clicks.
      const handleClick = (event2: MouseEvent) => {
        if (background !== event.target || background !== event2.target) {
          return;
        }

        if (backdrop === 'static') {
          // TODO: triggerBackdropTransition()
          return;
        }

        if (backdrop) {
          handleClose?.();
        }
      };

      state.current = {
        waitingForMouseUp: true,
        handleClick,
      };

      background.addEventListener('click', handleClick, { once: true });
    };

    const handleMouseUp = () => {
      state.current.waitingForMouseUp = false;
    };

    background.addEventListener('mousedown', handleMouseDown);
    background.addEventListener('mouseup', handleMouseUp);

    return () => {
      background.removeEventListener('mousedown', handleMouseDown);
      background.removeEventListener('mouseup', handleMouseUp);
    };
  }, [backdrop, handleClose]);

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
