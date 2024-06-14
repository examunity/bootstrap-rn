import React from 'react';

export interface ContextType {
  scrollbars: {
    hide: () => void;
    show: () => void;
  };

  addFixedElement: (ref: unknown) => {
    remove: () => void;
  };
}

const Context = React.createContext<ContextType | null>(null);

Context.displayName = 'BootstrapRNContext';

export default Context;
