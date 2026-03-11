import React from 'react';
import type { View as FormButtonRef } from 'react-native';
import { GestureResponderEvent } from 'react-native';
import { useFormikContext } from 'formik';
import { Button, ButtonProps } from 'bootstrap-rn';

export interface FormButtonProps extends ButtonProps {
  children: React.ReactNode;
  type: 'submit' | 'reset';
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

function FormButton(
  props: FormButtonProps & React.RefAttributes<FormButtonRef>,
) {
  const {
    ref,
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
}

export default FormButton;
