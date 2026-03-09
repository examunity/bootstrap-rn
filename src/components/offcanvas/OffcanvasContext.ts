import React from 'react';

export interface OffcanvasContextProps {
  identifier: string;
}

const OffcanvasContext = React.createContext<OffcanvasContextProps | null>(
  null,
);

OffcanvasContext.displayName = 'OffcanvasContext';

export default OffcanvasContext;
