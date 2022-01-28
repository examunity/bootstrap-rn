import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { View } from 'bootstyle';
import { Formik } from 'formik';
import FormButton from './FormButton';
import FormCheckbox from './FormCheckbox';
import FormChoice from './FormChoice';
import FormInput from './FormInput';
import FormPicker from './FormPicker';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object.isRequired,
  validate: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  inline: PropTypes.bool,
};

const Form = React.forwardRef((props, ref) => {
  const {
    children,
    initialValues,
    validate,
    onSubmit,
    ...elementProps
  } = props;

  const role = Platform.OS === 'web' ? 'form' : null;

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={false}
      validateOnChange={false}
      validate={validate}
      onSubmit={onSubmit}
    >
      {(form) => (
        <View {...elementProps} ref={ref} accessibilityRole={role}>
          {typeof children === 'function' ? children(form) : children}
        </View>
      )}
    </Formik>
  );
});

Form.displayName = 'Form';
Form.propTypes = propTypes;

Form.Button = FormButton;
Form.Checkbox = FormCheckbox;
Form.Choice = FormChoice;
Form.Input = FormInput;
Form.Picker = FormPicker;

export default Form;
