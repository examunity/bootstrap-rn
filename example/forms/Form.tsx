import React from 'react';
import { Platform } from 'react-native';
import { View } from 'bootstrap-rn';
import { Formik, FormikProps } from 'formik';
import FormButton from './FormButton';
import FormCheckbox from './FormCheckbox';
import FormChoice from './FormChoice';
import FormInput from './FormInput';
import FormPicker from './FormPicker';
import { ViewRef } from '../../src/components/View';

interface FormProps {
  children: ((form: FormikProps<unknown>) => React.ReactNode) | React.ReactNode;
  initialValues: Record<string, unknown>;
  validate?: () => void;
  onSubmit: (
    values: unknown,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => void;

  inline?: boolean;
}

const Form = React.forwardRef<ViewRef, FormProps>((props, ref) => {
  const { children, initialValues, validate, onSubmit, ...elementProps } =
    props;

  const role = Platform.OS === 'web' ? 'form' : undefined;

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={false}
      validateOnChange={false}
      validate={validate}
      onSubmit={onSubmit}
    >
      {(form) => (
        <View {...elementProps} ref={ref} role={role}>
          {typeof children === 'function' ? children(form) : children}
        </View>
      )}
    </Formik>
  );
});

Form.displayName = 'Form';

export default Object.assign(Form, {
  Button: FormButton,
  Checkbox: FormCheckbox,
  Choice: FormChoice,
  Input: FormInput,
  Picker: FormPicker,
});
