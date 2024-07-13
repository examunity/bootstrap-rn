import React from 'react';

export interface ModalContextProps {
  scrollable: boolean;
}

const ModalContext = React.createContext<ModalContextProps | null>(null);

ModalContext.displayName = 'ModalContext';

export default ModalContext;
