import React from 'react';
import type { PressableRef } from '../Pressable';
import FormCheckInput, { FormCheckInputProps } from './FormCheckInput';

const Checkbox = React.forwardRef<PressableRef, FormCheckInputProps>(
  (props, ref) => {
    const { ...elementProps } = props;

    return <FormCheckInput {...elementProps} ref={ref} type="checkbox" />;
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
