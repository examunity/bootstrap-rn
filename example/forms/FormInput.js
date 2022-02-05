import React from 'react';
import PropTypes from 'prop-types';
import { Text, Input } from 'bootstrap-native';
import Field from './Field';
import useFormField from './useFormField';
import FieldPropTypes from './FieldPropTypes';

const propTypes = {
  ...FieldPropTypes,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf([
    'color',
    'email',
    'number',
    'password',
    'range',
    'tel',
    'text',
    'url',
  ]),
  size: PropTypes.oneOf(['sm', 'lg']),
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  trimValue: PropTypes.bool,
  convertEmptyValueToNull: PropTypes.bool,
};

const FormInput = React.forwardRef((props, ref) => {
  const {
    name,
    title,
    placeholder = '',
    type = 'text',
    size,
    info,
    multiline = false,
    numberOfLines,
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

  const sanitizeValue = (rawValue) => {
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
      elementProps={elementProps}
    >
      {title && (
        <Text small styleName="fw-bold">
          {title}
        </Text>
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
        onKeyDown={field.handleSubmitOnEnter}
        placeholder={placeholder}
        size={size}
        multiline={multiline}
        numberOfLines={numberOfLines || (multiline ? 7 : null)}
        autoComplete={autoComplete === 'on' ? null : autoComplete}
        autoFocus={autoFocus}
        invalid={field.touched && field.error}
        disabled={disabled}
      />
    </Field>
  );
});

FormInput.displayName = 'FormInput';
FormInput.propTypes = propTypes;

export default FormInput;
