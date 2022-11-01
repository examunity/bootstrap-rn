import React from 'react';
import FormCheckInput from './FormCheckInput';

const Switch = React.forwardRef((props, ref) => {
  const { ...elementProps } = props;

  return <FormCheckInput {...elementProps} ref={ref} type="switch" />;
});

Switch.displayName = 'Switch';

export default Switch;
