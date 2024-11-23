import React, { useId, useMemo } from 'react';
import type { View as FormChoiceRef } from 'react-native';
import { Radio, Checkbox, FormCheck, Text, View } from 'bootstrap-rn';
import Field from './Field';
import useFormField from './useFormField';
import FieldPropTypes from './FieldPropTypes';

type Options = {
  value: string | number | boolean | object | null;
  label: string;
};

export interface FormChoiceProps extends FieldPropTypes {
  options: Options[];
  multiple?: boolean;
}

type Value = string | number | boolean | object | null | undefined;

const FormChoice = React.forwardRef<FormChoiceRef, FormChoiceProps>(
  (props, ref) => {
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

    // For multiple === false the type is Value, but this leads to errors.
    const field = useFormField<Value[]>(name);
    const id = useId();

    const optionKeys = useMemo(
      () =>
        options.map((option) => {
          if (typeof option.value === 'object') {
            return JSON.stringify(option.value);
          }
          if (typeof option.value === 'boolean') {
            return Number(option.value);
          }
          return option.value;
        }),
      [options],
    );

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
                  invalid={field.touched && !!field.error}
                  disabled={disabled}
                  key={optionKeys[key]}
                >
                  <Radio
                    ref={ref}
                    value={option.value}
                    onBlur={() => {
                      field.setTouched();
                    }}
                    id={`${id}-${key}`}
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
                  invalid={field.touched && !!field.error}
                  disabled={disabled}
                  key={optionKeys[key]}
                >
                  <Checkbox
                    ref={ref}
                    value={field.value?.indexOf(option.value) !== -1}
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
                    id={`${id}-${key}`}
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
  },
);

FormChoice.displayName = 'FormChoice';

export default FormChoice;
