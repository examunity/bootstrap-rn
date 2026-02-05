import React, { useEffect, useId } from 'react';
import { BackHandler } from 'react-native';
import { Portal } from '@rn-primitives/portal';
import type { ViewRef } from '../View';

type DialogProps = {
  children: React.ReactNode;
  // eslint-disable-next-line react/no-unused-prop-types
  dialogRef: React.RefObject<ViewRef | null>;
  // eslint-disable-next-line react/no-unused-prop-types
  backgroundRef: React.RefObject<ViewRef | null>;
  onClose?: () => void;
  backdrop: boolean | 'static';
  backdropElement: React.ReactNode;
  // eslint-disable-next-line react/no-unused-prop-types
  scroll?: boolean;
};

function Dialog({
  children,
  backdrop,
  backdropElement,
  onClose: handleClose,
}: DialogProps) {
  const identifier = useId();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        handleClose?.();
        return true;
      },
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <Portal name={identifier}>
      {backdrop && backdropElement}
      {children}
    </Portal>
  );
}

export default Dialog;
