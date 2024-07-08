import React, { useId } from 'react';
import type { TextInputProps, TextInput as FormInputRef } from 'react-native';
import { Text, Input, FormLabel } from 'bootstrap-rn';
import Field from './Field';
import useFormField from './useFormField';
import FieldPropTypes from './FieldPropTypes';

export interface FormInputProps extends FieldPropTypes {
  placeholder?: string;
  size?: 'sm' | 'lg';
  multiline?: boolean;
  rows?: number;
  autoComplete?: TextInputProps['autoComplete'];
  autoFocus?: boolean;
  trimValue?: boolean;
  secureTextEntry?: boolean;
  convertEmptyValueToNull?: boolean;
}

const FormInput = React.forwardRef<FormInputRef, FormInputProps>(
  (props, ref) => {
    const {
      name,
      title,
      placeholder = '',
      size,
      info,
      multiline = false,
      rows,
      autoComplete = 'on',
      autoFocus = false,
      trimValue = false,
      secureTextEntry = false,
      convertEmptyValueToNull = false,
      disabled = false,
      onValueChange,
      formatError = (error) => error,
      ...elementProps
    } = props;

    const field = useFormField<string>(name);
    const id = useId();

    const sanitizeValue = (rawValue: string) => {
      // Trim value if type is not password
      const trimmedValue =
        trimValue && secureTextEntry ? rawValue.trim() : rawValue;

      // Handle empty string as null and return
      return convertEmptyValueToNull && trimmedValue === ''
        ? null
        : trimmedValue;
    };

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
        <Input
          ref={ref}
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
          rows={rows || (multiline ? 7 : undefined)}
          autoComplete={autoComplete === 'on' ? undefined : autoComplete}
          autoFocus={autoFocus}
          secureTextEntry={secureTextEntry}
          invalid={field.touched && !!field.error}
          disabled={disabled}
          id={id}
        />
      </Field>
    );
  },
);

FormInput.displayName = 'FormInput';

export default FormInput;
