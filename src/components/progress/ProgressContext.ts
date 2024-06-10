import React from 'react';

type ProgressContextType = {
  min: number;
  max: number;
};
const ProgressContext = React.createContext<ProgressContextType | null>(null);

ProgressContext.displayName = 'ProgressContext';

export default ProgressContext;
