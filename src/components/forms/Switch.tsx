import React from 'react';
import FormCheckInput, { FormCheckInputProps } from './FormCheckInput';

const Switch = React.forwardRef<HTMLInputElement, FormCheckInputProps>(
  (props, ref) => {
    const { ...elementProps } = props;

    return <FormCheckInput {...elementProps} ref={ref} type="switch" />;
  },
);

Switch.displayName = 'Switch';

export default Switch;
