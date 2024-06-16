import React from 'react';

export type ButtonGroupContextType = {
  size?: string;
};

const ButtonGroupContext = React.createContext<ButtonGroupContextType | null>(
  null,
);

ButtonGroupContext.displayName = 'ButtonGroupContext';

export default ButtonGroupContext;
