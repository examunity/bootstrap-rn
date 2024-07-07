import React from 'react';
import { ViewProps } from 'bootstrap-rn';

export interface FieldPropTypes extends ViewProps {
  name: string;
  title?: string;
  info?: string;
  disabled?: boolean;
  onValueChange?: (value: unknown) => void;
  formatError?: (error: string | undefined) => string;
  component?: React.ElementType;
}

export default FieldPropTypes;
