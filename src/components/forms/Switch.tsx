import React from 'react';
import type { PressableRef } from '../Pressable';
import FormCheckInput, { FormCheckInputProps } from './FormCheckInput';

const Switch = React.forwardRef<PressableRef, FormCheckInputProps>(
  (props, ref) => {
    const { ...elementProps } = props;

    return <FormCheckInput {...elementProps} ref={ref} type="switch" />;
  },
);

Switch.displayName = 'Switch';

export default Switch;
