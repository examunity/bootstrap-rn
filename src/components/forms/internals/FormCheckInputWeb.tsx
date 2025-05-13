import React from 'react';
import {
  // @ts-expect-error import is available
  unstable_createElement as createElement,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import useBackground from '../../../hooks/useBackground';
import type { PressableRef } from '../../Pressable';
import type { FormCheckInputProps } from '../FormCheckInput';

export interface FormCheckInputWebProps extends FormCheckInputProps {
  style: ViewStyle[];
}

const styles = StyleSheet.create({
  reboot: {
    flexShrink: 0,
    margin: 0,
  },
});

type InputProps = {
  style?: ViewStyle[];
  type: 'checkbox' | 'radio';
  checked: boolean;
  onChange: () => void;
  onFocus: () => void;
  onBlur: () => void;
  disabled: boolean;
  id?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ style, ...props }, ref) =>
    createElement('input', { ...props, ref, style: [styles.reboot, style] }),
);

const FormCheckInputWeb = React.forwardRef<
  PressableRef,
  FormCheckInputWebProps
>((props, ref) => {
  const {
    type,
    value,
    onValueChange: handleValueChange,
    onFocus = () => {},
    onBlur = () => {},
    disabled = false,
    style,
    id,
    autoFocus,
  } = props;

  const inputBackground = useBackground(style);

  return (
    <Input
      // @ts-expect-error We need to create a native ref here in the future.
      ref={ref}
      type={type === 'switch' ? 'checkbox' : type}
      checked={value}
      onChange={() => {
        if (handleValueChange) handleValueChange(!value);
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      // @ts-expect-error inputBackground.style should be a ViewStyle here.
      style={inputBackground.style}
      id={id}
      autoFocus={autoFocus}
    />
  );
});

FormCheckInputWeb.displayName = 'FormCheckInputWeb';

export default FormCheckInputWeb;
