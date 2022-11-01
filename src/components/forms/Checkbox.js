import React from 'react';
import FormCheckInput from './FormCheckInput';

const Checkbox = React.forwardRef((props, ref) => {
  const { ...elementProps } = props;

  return <FormCheckInput {...elementProps} ref={ref} type="checkbox" />;
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
