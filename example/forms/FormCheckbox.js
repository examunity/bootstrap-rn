import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Text } from 'bootstrap-rn';
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

  return (
    <Field
      error={formatError(field.error)}
      touched={field.touched}
      info={info}
      elementProps={elementProps}
    >
      {title && (
        <Text small styleName="fw-bold">
          {title}
        </Text>
      )}
      <Checkbox
        ref={ref}
        name={name}
        value={field.value}
        onChange={(nextValue) => {
          field.setValue(nextValue, onValueChange);
        }}
        onBlur={() => {
          field.setTouched();
        }}
        onKeyDown={field.handleSubmitOnEnter}
        invalid={field.touched && field.error}
        disabled={disabled}
      >
        {label}
      </Checkbox>
    </Field>
  );
});

FormCheckbox.displayName = 'FormCheckbox';
FormCheckbox.propTypes = propTypes;

export default FormCheckbox;
