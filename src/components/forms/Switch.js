import React from 'react';
import CheckInput from './CheckInput';

const Switch = React.forwardRef((props, ref) => {
  const { ...elementProps } = props;

  return <CheckInput {...elementProps} ref={ref} type="switch" />;
});

Switch.displayName = 'Switch';

export default Switch;
