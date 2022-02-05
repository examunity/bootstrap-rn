import React from 'react';
import PropTypes from 'prop-types';
import { Picker, Text } from 'bootstrap-rn';
import Field from './Field';
import useFormField from './useFormField';
import FieldPropTypes from './FieldPropTypes';

const propTypes = {
  ...FieldPropTypes,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      value: PropTypes.any,
      label: PropTypes.node,
    }),
  ).isRequired,
};

const FormPicker = React.forwardRef((props, ref) => {
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
      <Picker
        ref={ref}
        name={name}
        value={field.value || ''}
        onChange={(nextValue) => {
          field.setValue(nextValue, onValueChange);
        }}
        onBlur={() => {
          field.setTouched();
        }}
        placeholder={placeholder}
        invalid={field.touched && field.error}
        disabled={disabled}
      >
        {options.map((option) => (
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
FormPicker.propTypes = propTypes;

export default FormPicker;
