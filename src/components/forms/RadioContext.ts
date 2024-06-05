import React from 'react';

type RadioContextType = {
  selectedValue?: boolean | number | string | object;
  onValueChange: (value?: boolean | number | string | object) => void;
  disabled?: boolean;
};

const RadioContext = React.createContext<RadioContextType | null>(null);

RadioContext.displayName = 'RadioContext';

export default RadioContext;
