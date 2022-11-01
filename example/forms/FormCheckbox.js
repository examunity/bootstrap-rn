import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormCheck, Text } from 'bootstrap-rn';
import Field from './Field';
import useFormField from './useFormField';
import FieldPropTypes from './FieldPropTypes';

const propTypes = {
  ...FieldPropTypes,
  label: PropTypes.node.isRequired,
};

const FormCheckbox = React.forwardRef((props, ref) => {
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

  const field = useFormField(name);
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
      <FormCheck>
        <Checkbox
          ref={ref}
          name={name}
          value={field.value}
          onValueChange={(nextValue) => {
            field.setValue(nextValue, onValueChange);
          }}
          onBlur={() => {
            field.setTouched();
          }}
          invalid={field.touched && field.error}
          disabled={disabled}
          nativeID={id}
        />
        <FormCheck.Label htmlFor={id}>
          <Text>{label}</Text>
        </FormCheck.Label>
      </FormCheck>
    </Field>
  );
});

FormCheckbox.displayName = 'FormCheckbox';
FormCheckbox.propTypes = propTypes;

export default FormCheckbox;
