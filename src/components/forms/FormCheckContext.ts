import React from 'react';

export type FormCheckContextType = {
  reverse: boolean;
  disabled: boolean;
  valid: boolean;
  invalid: boolean;
};

const FormCheckContext = React.createContext<FormCheckContextType | null>(null);

FormCheckContext.displayName = 'FormCheckContext';

export default FormCheckContext;
