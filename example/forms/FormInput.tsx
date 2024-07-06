import React, { useId } from 'react';
import { Text, Input, FormLabel } from 'bootstrap-rn';
import Field from './Field';
import useFormField from './useFormField';
import FieldPropTypes from './FieldPropTypes';
import { ViewRef } from '../../src/components/View';

export interface FormInputProps extends FieldPropTypes {
  placeholder?: string;
  type?:
    | 'color'
    | 'email'
    | 'number'
    | 'password'
    | 'range'
    | 'tel'
    | 'text'
    | 'url';
  size?: 'sm' | 'lg';
  multiline?: boolean;
  rows?: number;
  autoComplete?: string;
  autoFocus?: boolean;
  trimValue?: boolean;
  convertEmptyValueToNull?: boolean;
}

const FormInput = React.forwardRef<ViewRef, FormInputProps>((props, ref) => {
  const {
    name,
    title,
    placeholder = '',
    type = 'text',
    size,
    info,
    multiline = false,
    rows,
    autoComplete = 'on',
    autoFocus = false,
    trimValue = false,
    convertEmptyValueToNull = false,
    disabled = false,
    onValueChange,
    formatError = (error) => error,
    ...elementProps
  } = props;

  const field = useFormField(name);
  const id = useId();

  const sanitizeValue = (rawValue: string) => {
    // Trim value if type is not password
    const trimmedValue =
      trimValue && type !== 'password' ? rawValue.trim() : rawValue;

    // Handle empty string as null and return
    return convertEmptyValueToNull && trimmedValue === '' ? null : trimmedValue;
  };

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
      <Input
        ref={ref}
        type={type}
        name={name}
        value={field.value || ''}
        onChangeText={(nextValue) => {
          field.setValue(sanitizeValue(nextValue), onValueChange);
        }}
        onBlur={() => {
          field.setTouched();
        }}
        placeholder={placeholder}
        size={size}
        multiline={multiline}
        rows={rows || (multiline ? 7 : null)}
        autoComplete={autoComplete === 'on' ? null : autoComplete}
        autoFocus={autoFocus}
        invalid={field.touched && field.error}
        disabled={disabled}
        id={id}
      />
    </Field>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
