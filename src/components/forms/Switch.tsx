import React from 'react';
import type { PressableRef } from '../Pressable';
import FormCheckInput, { FormCheckInputProps } from './FormCheckInput';

export interface SwitchProps extends Omit<FormCheckInputProps, 'type'> {}

function Switch(props: SwitchProps & React.RefAttributes<PressableRef>) {
  const { ref, ...elementProps } = props;

  return <FormCheckInput {...elementProps} ref={ref} type="switch" />;
}

export default Switch;
