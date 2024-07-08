import React from 'react';
import type { PressableRef } from '../Pressable';
import FormCheckInput, { FormCheckInputProps } from './FormCheckInput';

export interface CheckboxProps extends Omit<FormCheckInputProps, 'type'> {}

const Checkbox = React.forwardRef<PressableRef, CheckboxProps>((props, ref) => {
  const { ...elementProps } = props;

  return <FormCheckInput {...elementProps} ref={ref} type="checkbox" />;
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
