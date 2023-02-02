import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'bootstrap-rn';
import { useFormikContext } from 'formik';

const propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['submit', 'reset']).isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

const FormButton = React.forwardRef((props, ref) => {
  const {
    type,
    disabled = false,
    onPress: handlePress,
    ...elementProps
  } = props;

  const form = useFormikContext();

  const buttonDisabled = disabled || form.isSubmitting;

  return (
    <Button
      {...elementProps}
      ref={ref}
      onPress={(event) => {
        if (handlePress) handlePress(event);

        if (!event.defaultPrevented) {
          if (type === 'submit') {
            form.submitForm();
          }

          if (type === 'reset') {
            form.resetForm();
          }
        }
      }}
      disabled={buttonDisabled}
    />
  );
});

FormButton.displayName = 'FormButton';
FormButton.propTypes = propTypes;

export default FormButton;
