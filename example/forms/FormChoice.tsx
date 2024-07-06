import React, { useId } from 'react';
import { Radio, Checkbox, FormCheck, Text, View } from 'bootstrap-rn';
import Field from './Field';
import useFormField from './useFormField';
import FieldPropTypes from './FieldPropTypes';
import { ViewRef } from '../../src/components/View';

type Options = {
  value: string;
  label: string;
};

export interface FormChoiceProps extends FieldPropTypes {
  options: Options[];
  multiple?: boolean;
}

const FormChoice = React.forwardRef<ViewRef, FormChoiceProps>((props, ref) => {
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
                invalid={field.touched && !!field.error}
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
                key={option.value}
              >
                <Checkbox
                  ref={ref}
                  name={`${name}[${key}]`}
                  value={field.value?.indexOf(option.value) !== -1}
                  onValueChange={(checked) => {
                    // Type 'string | undefined' must have a '[Symbol.iterator]()' method that returns an iterator
                    // @ts-expect-error see error above
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
});

FormChoice.displayName = 'FormChoice';

export default FormChoice;
