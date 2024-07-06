import React, { useId } from 'react';
import { Picker, Text, FormLabel } from 'bootstrap-rn';
import Field from './Field';
import useFormField from './useFormField';
import FieldPropTypes from './FieldPropTypes';
import { ViewRef } from '../../src/components/View';

type Options = {
  value: string;
  label: string;
};

export interface FormPickerProps extends FieldPropTypes {
  options: Options[];
  placeholder: string;
}

const FormPicker = React.forwardRef<ViewRef, FormPickerProps>((props, ref) => {
  const {
    name,
    title,
    placeholder = '',
    options,
    info,
    disabled = false,
    onValueChange,
    formatError = (error) => error,
    ...elementProps
  } = props;

  const field = useFormField(name);
  const id = useId();

  return (
    <Field
      error={formatError(field.error)}
      touched={field.touched}
      info={info}
      {...elementProps}
    >
      {title && (
        <FormLabel htmlFor={id}>
          <Text small styleName="fw-bold">
            {title}
          </Text>
        </FormLabel>
      )}
      <Picker
        ref={ref}
        name={name}
        selectedValue={field.value}
        onValueChange={(nextValue: unknown) => {
          field.setValue(nextValue, onValueChange);
        }}
        onBlur={() => {
          field.setTouched();
        }}
        placeholder={placeholder}
        invalid={field.touched && field.error}
        disabled={disabled}
        id={id}
      >
        {options.map((option: Options) => (
          <Picker.Item
            label={option.label}
            value={option.value}
            key={option.value}
          />
        ))}
      </Picker>
    </Field>
  );
});

FormPicker.displayName = 'FormPicker';

export default FormPicker;
