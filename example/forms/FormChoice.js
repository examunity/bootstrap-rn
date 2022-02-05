import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Checkbox, Text, View } from 'bootstrap-native';
import Field from './Field';
import useFormField from './useFormField';
import FieldPropTypes from './FieldPropTypes';

const propTypes = {
  ...FieldPropTypes,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      value: PropTypes.any,
      label: PropTypes.node,
    }),
  ).isRequired,
  multiple: PropTypes.bool,
};

const FormChoice = React.forwardRef((props, ref) => {
  const {
    name,
    title,
    options,
    info,
    multiple = false,
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
      <View>
        {!multiple && (
          <Radio.Group
            value={field.value}
            onChange={(nextValue) => {
              field.setValue(nextValue, onValueChange);
            }}
          >
            {options.map((option) => (
              <Radio
                ref={ref}
                name={name}
                value={option.value || ''}
                onBlur={() => {
                  field.setTouched();
                }}
                onKeyDown={field.handleSubmitOnEnter}
                invalid={field.touched && field.error}
                disabled={disabled}
                key={option.value}
              >
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        )}
        {multiple && (
          <View>
            {options.map((option, key) => (
              <Checkbox
                ref={ref}
                name={`${name}[${key}]`}
                value={field.value.indexOf(option.value) !== -1}
                onChange={(checked) => {
                  const nextValue = [...field.value];

                  if (checked) {
                    nextValue.push(option.value);
                  } else {
                    nextValue.splice(nextValue.indexOf(option.value), 1);
                  }

                  field.setValue(nextValue, onValueChange);
                }}
                onBlur={() => {
                  field.setTouched();
                }}
                onKeyDown={field.handleSubmitOnEnter}
                invalid={field.touched && field.error}
                disabled={disabled}
                key={option.value}
              >
                {option.label}
              </Checkbox>
            ))}
          </View>
        )}
      </View>
    </Field>
  );
});

FormChoice.displayName = 'FormChoice';
FormChoice.propTypes = propTypes;

export default FormChoice;
