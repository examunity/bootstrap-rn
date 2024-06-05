import React from 'react';
import {
  unstable_createElement as createElement,
  StyleSheet,
} from 'react-native';
import useBackground from '../../../hooks/useBackground';

export type FormCheckInputWebProps = {
  type: 'checkbox' | 'radio' | 'switch';
  value: boolean;
  onValueChange: (value?: boolean) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  style?: unknown;
  id?: string;
};

const styles = StyleSheet.create({
  reboot: {
    flexShrink: 0,
    margin: 0,
  },
});

type InputProps = {
  style?: unknown;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ style, ...props }, ref) =>
    createElement('input', { ...props, ref, style: [styles.reboot, style] }),
);

const FormCheckInputWeb = React.forwardRef<
  HTMLInputElement,
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
  } = props;

  const inputBackground = useBackground(style);

  return (
    <Input
      ref={ref}
      type={type === 'switch' ? 'checkbox' : type}
      checked={value}
      onChange={() => {
        handleValueChange(!value);
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      style={inputBackground.style}
      id={id}
    />
  );
});

FormCheckInputWeb.displayName = 'FormCheckInputWeb';

export default FormCheckInputWeb;
