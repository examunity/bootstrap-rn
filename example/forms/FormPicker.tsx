import React, { useId } from 'react';
import type { View as FormPickerRef } from 'react-native';
import { Picker, Text, FormLabel } from 'bootstrap-rn';
import Field from './Field';
import useFormField from './useFormField';
import FieldPropTypes from './FieldPropTypes';

type Options = {
  value: string;
  label: string;
};

export interface FormPickerProps extends FieldPropTypes {
  options: Options[];
  placeholder: string;
}

type Value = string | number | boolean | object | undefined;

const FormPicker = React.forwardRef<FormPickerRef, FormPickerProps>(
  (props, ref) => {
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

    const field = useFormField<Value>(name);
    const id = useId();

    return (
      <Field
        error={formatError(field.error)}
        touched={field.touched}
        info={info}
        elementProps={elementProps}
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
          selectedValue={field.value}
          onValueChange={(nextValue: unknown) => {
            field.setValue(nextValue, onValueChange);
          }}
          onBlur={() => {
            field.setTouched();
          }}
          placeholder={placeholder}
          invalid={field.touched && !!field.error}
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
  },
);

FormPicker.displayName = 'FormPicker';

export default FormPicker;
