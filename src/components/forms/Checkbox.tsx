import React from 'react';
import type { PressableRef } from '../Pressable';
import FormCheckInput, { FormCheckInputProps } from './FormCheckInput';

export interface CheckboxProps extends Omit<FormCheckInputProps, 'type'> {}

function Checkbox(props: CheckboxProps & React.RefAttributes<PressableRef>) {
  const { ref, ...elementProps } = props;

  return <FormCheckInput {...elementProps} ref={ref} type="checkbox" />;
}

export default Checkbox;
