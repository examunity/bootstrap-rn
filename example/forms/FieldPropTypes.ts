import React from 'react';

export interface FieldPropTypes {
  name: string;
  title?: string;
  info?: string;
  disabled?: boolean;
  onValueChange?: (value: unknown) => void;
  formatError?: (error: string | undefined) => string;
  component?: React.ElementType;
}

export default FieldPropTypes;
