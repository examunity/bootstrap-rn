import React from 'react';

export interface OffcanvasContextProps {
  titleIdentifier: string;
}

const OffcanvasContext = React.createContext<OffcanvasContextProps | null>(
  null,
);

OffcanvasContext.displayName = 'OffcanvasContext';

export default OffcanvasContext;
