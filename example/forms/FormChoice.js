import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { Radio, Checkbox, FormCheck, Text, View } from 'bootstrap-rn';
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
      <View>
        {!multiple && (
          <Radio.Group
            selectedValue={field.value}
            onValueChange={(nextValue) => {
              field.setValue(nextValue, onValueChange);
            }}
          >
            {options.map((option, key) => (
              <FormCheck
                invalid={field.touched && field.error}
                disabled={disabled}
                key={option.value}
              >
                <Radio
                  ref={ref}
                  name={name}
                  value={option.value}
                  onBlur={() => {
                    field.setTouched();
                  }}
                  nativeID={`${id}-${key}`}
                />
                <FormCheck.Label htmlFor={`${id}-${key}`}>
                  <Text>{option.label}</Text>
                </FormCheck.Label>
              </FormCheck>
            ))}
          </Radio.Group>
        )}
        {multiple && (
          <View>
            {options.map((option, key) => (
              <FormCheck
                invalid={field.touched && field.error}
                disabled={disabled}
                key={option.value}
              >
                <Checkbox
                  ref={ref}
                  name={`${name}[${key}]`}
                  value={field.value.indexOf(option.value) !== -1}
                  onValueChange={(checked) => {
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
                  nativeID={`${id}-${key}`}
                />
                <FormCheck.Label htmlFor={`${id}-${key}`}>
                  <Text>{option.label}</Text>
                </FormCheck.Label>
              </FormCheck>
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
