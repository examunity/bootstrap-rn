import React from 'react';

type OffcanvasContextType = unknown;

const OffcanvasContext = React.createContext<OffcanvasContextType | null>(null);

OffcanvasContext.displayName = 'OffcanvasContext';

export default OffcanvasContext;
