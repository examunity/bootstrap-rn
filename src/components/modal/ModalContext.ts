import React from 'react';

type ModalContextType = {
  scrollable: boolean;
};

const ModalContext = React.createContext<ModalContextType | null>(null);

ModalContext.displayName = 'ModalContext';

export default ModalContext;
