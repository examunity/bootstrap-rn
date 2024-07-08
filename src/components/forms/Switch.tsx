import React from 'react';
import type { PressableRef } from '../Pressable';
import FormCheckInput, { FormCheckInputProps } from './FormCheckInput';

export interface SwitchProps extends Omit<FormCheckInputProps, 'type'> {}

const Switch = React.forwardRef<PressableRef, SwitchProps>((props, ref) => {
  const { ...elementProps } = props;

  return <FormCheckInput {...elementProps} ref={ref} type="switch" />;
});

Switch.displayName = 'Switch';

export default Switch;
