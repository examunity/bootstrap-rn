import React from 'react';
import useForcedContext from '../../hooks/useForcedContext';
import FormCheckInput, { FormCheckInputProps } from './FormCheckInput';
import RadioGroup from './RadioGroup';
import RadioContext from './RadioContext';

export type RadioProps = {
  value?: boolean | number | string | object;
};

const Radio = React.forwardRef<FormCheckInputProps, RadioProps>(
  (props, ref) => {
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
  },
);

Radio.displayName = 'Radio';

export default Object.assign(Radio, {
  Group: RadioGroup,
});
