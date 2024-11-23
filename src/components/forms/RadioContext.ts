import React from 'react';

type RadioContextType = {
  selectedValue?: boolean | number | string | object | null | undefined;
  onValueChange: (value: boolean | number | string | object | null) => void;
  disabled: boolean;
};

const RadioContext = React.createContext<RadioContextType | null>(null);

RadioContext.displayName = 'RadioContext';

export default RadioContext;
