import React from 'react';
import FormCheckInput, { FormCheckInputProps } from './FormCheckInput';

const Checkbox = React.forwardRef<unknown, FormCheckInputProps>(
  (props, ref) => {
    const { ...elementProps } = props;

    return <FormCheckInput {...elementProps} ref={ref} type="checkbox" />;
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
