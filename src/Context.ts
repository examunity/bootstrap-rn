import React from 'react';

interface ContextType {
  scrollbars: {
    hide: () => void;
    show: () => void;
  };
}

const Context = React.createContext<ContextType | null>(null);

Context.displayName = 'BootstrapRNContext';

export default Context;
