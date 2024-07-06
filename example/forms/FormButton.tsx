import React from 'react';
import type { View as FormButtonRef } from 'react-native';
import { GestureResponderEvent } from 'react-native';
import { useFormikContext } from 'formik';
import { Button } from 'bootstrap-rn';
import { ButtonProps } from '../../src/components/buttons/Button';

export interface FormButtonProps extends ButtonProps {
  children: React.ReactNode;
  type: 'submit' | 'reset';
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

const FormButton = React.forwardRef<FormButtonRef, FormButtonProps>(
  (props, ref) => {
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

          if (event.defaultPrevented) {
            return;
          }

          if (type === 'submit') {
            form.submitForm();
          }

          if (type === 'reset') {
            form.resetForm();
          }
        }}
        disabled={buttonDisabled}
      />
    );
  },
);

FormButton.displayName = 'FormButton';

export default FormButton;
