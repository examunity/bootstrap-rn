import React, { useId } from 'react';
import type { View as FormCheckboxRef } from 'react-native';
import { Checkbox, FormCheck, Text } from 'bootstrap-rn';
import Field from './Field';
import useFormField from './useFormField';
import FieldPropTypes from './FieldPropTypes';

export interface FormCheckboxProps extends FieldPropTypes {
  label: React.ReactNode;
}

const FormCheckbox = React.forwardRef<FormCheckboxRef, FormCheckboxProps>(
  (props, ref) => {
    const {
      name,
      title,
      label,
      info,
      disabled = false,
      onValueChange,
      formatError = (error) => error,
      ...elementProps
    } = props;

    const field = useFormField<boolean>(name);
    const id = useId();

    return (
      <Field
        error={formatError(field.error)}
        touched={field.touched}
        info={info}
        elementProps={elementProps}
      >
        {title && (
          <Text small styleName="fw-bold mb-2">
            {title}
          </Text>
        )}
        <FormCheck invalid={field.touched && !!field.error}>
          <Checkbox
            ref={ref}
            value={field.value}
            onValueChange={(nextValue) => {
              field.setValue(nextValue, onValueChange);
            }}
            onBlur={() => {
              field.setTouched();
            }}
            disabled={disabled}
            id={id}
          />
          <FormCheck.Label htmlFor={id}>
            <Text>{label}gagagagas</Text>
          </FormCheck.Label>
        </FormCheck>
      </Field>
    );
  },
);

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;
