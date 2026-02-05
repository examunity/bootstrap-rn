import React from 'react';
import { Portal } from '@rn-primitives/portal';
import BackdropHandler from './BackdropHandler';

type FloatingProps = {
  children: React.ReactNode;
  id: string;
  onClose?: () => void;
};

function Floating({ children, id, onClose: handleClose }: FloatingProps) {
  return (
    <Portal name={id}>
      <BackdropHandler onClose={handleClose} />
      {children}
    </Portal>
  );
}

export default Floating;
