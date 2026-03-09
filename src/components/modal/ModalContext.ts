import React from 'react';

export interface ModalContextProps {
  identifier: string;
  scrollable: boolean;
}

const ModalContext = React.createContext<ModalContextProps | null>(null);

ModalContext.displayName = 'ModalContext';

export default ModalContext;
