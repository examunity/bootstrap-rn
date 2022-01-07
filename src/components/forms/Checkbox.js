import React from 'react';
import CheckInput from './CheckInput';

const Checkbox = React.forwardRef((props, ref) => {
  const { ...elementProps } = props;

  return <CheckInput {...elementProps} ref={ref} type="checkbox" />;
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
