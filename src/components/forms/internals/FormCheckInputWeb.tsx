import React from 'react';
import {
  // @ts-expect-error import is available
  unstable_createElement as createElement,
  StyleSheet,
} from 'react-native';
import useBackground from '../../../hooks/useBackground';
import type { PressableRef } from '../../Pressable';

export type FormCheckInputWebProps = {
  type: 'checkbox' | 'radio' | 'switch';
  value: boolean;
  onValueChange?: (value?: boolean) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  style?: unknown;
  id?: string;
  autoFocus?: boolean;
};

const styles = StyleSheet.create({
  reboot: {
    flexShrink: 0,
    margin: 0,
  },
});

type InputProps = {
  style?: unknown;
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
      style={inputBackground.style}
      id={id}
      autoFocus={autoFocus}
    />
  );
});

FormCheckInputWeb.displayName = 'FormCheckInputWeb';

export default FormCheckInputWeb;
