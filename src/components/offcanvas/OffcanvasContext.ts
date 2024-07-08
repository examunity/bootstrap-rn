import React from 'react';

type OffcanvasContextType = Record<string, never>;

const OffcanvasContext = React.createContext<OffcanvasContextType | null>(null);

OffcanvasContext.displayName = 'OffcanvasContext';

export default OffcanvasContext;
