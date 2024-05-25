import React from 'react';

export interface ButtonGroupContextType {
  size?: string;
}

const ButtonGroupContext = React.createContext<ButtonGroupContextType | null>(
  null,
);

ButtonGroupContext.displayName = 'ButtonGroupContext';

export default ButtonGroupContext;
