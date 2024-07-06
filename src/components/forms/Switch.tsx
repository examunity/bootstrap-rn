import React from 'react';
import type { PressableRef } from '../Pressable';
import FormCheckInput, { FormCheckInputProps } from './FormCheckInput';

export interface SwitchProps extends Omit<FormCheckInputProps, 'type'> {
  type?: 'checkbox' | 'radio' | 'switch';
}

const Switch = React.forwardRef<PressableRef, SwitchProps>((props, ref) => {
  const { type = 'switch', ...elementProps } = props;

  return <FormCheckInput {...elementProps} ref={ref} type={type} />;
});

Switch.displayName = 'Switch';

export default Switch;
