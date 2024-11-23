import React from 'react';
import type { PressableRef } from '../Pressable';
import useForcedContext from '../../hooks/useForcedContext';
import FormCheckInput, { FormCheckInputProps } from './FormCheckInput';
import RadioGroup from './RadioGroup';
import RadioContext from './RadioContext';

export interface RadioProps
  extends Omit<FormCheckInputProps, 'value' | 'type'> {
  value: boolean | number | string | object | null;
}

const Radio = React.forwardRef<PressableRef, RadioProps>((props, ref) => {
  const { value, ...elementProps } = props;

  const { selectedValue, onValueChange, disabled } =
    useForcedContext(RadioContext);

  return (
    <FormCheckInput
      {...elementProps}
      ref={ref}
      type="radio"
      value={value === selectedValue}
      onValueChange={() => {
        onValueChange(value);
      }}
      disabled={disabled}
    />
  );
});

Radio.displayName = 'Radio';

export default Object.assign(Radio, {
  Group: RadioGroup,
});
