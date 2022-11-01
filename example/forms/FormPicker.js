import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { Picker, Text, FormLabel } from 'bootstrap-rn';
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
        name={name}
        selectedValue={field.value}
        onValueChange={(nextValue) => {
          field.setValue(nextValue, onValueChange);
        }}
        onBlur={() => {
          field.setTouched();
        }}
        placeholder={placeholder}
        invalid={field.touched && field.error}
        disabled={disabled}
        nativeID={id}
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
