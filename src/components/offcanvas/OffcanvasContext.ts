import React from 'react';

export type OffcanvasContextProps = Record<string, never>;

const OffcanvasContext = React.createContext<OffcanvasContextProps | null>(
  null,
);

OffcanvasContext.displayName = 'OffcanvasContext';

export default OffcanvasContext;
