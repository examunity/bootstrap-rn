import React, { forwardRef } from 'react';
import type { ViewStyle } from 'react-native';
import Pressable, { PressableRef } from '../../Pressable';
import useBackground from '../../../hooks/useBackground';

type FormCheckInputNativeProps = {
  type: 'checkbox' | 'radio' | 'switch';
  value: boolean;
  onValueChange?: (value: boolean) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  hitSlop?: number;
  disabled?: boolean;
  style: ViewStyle[];
  id?: string;
};

const FormCheckInputNative = forwardRef<
  PressableRef,
  FormCheckInputNativeProps
>((props, ref) => {
  const {
    type,
    value,
    onValueChange: handleValueChange,
    onFocus = () => {},
    onBlur = () => {},
    hitSlop = 8,
    disabled = false,
    style,
    id,
  } = props;

  const inputBackground = useBackground(style);

  return (
    <Pressable
      ref={ref}
      role={type}
      aria-checked={value}
      onPress={() => {
        if (handleValueChange) handleValueChange(!value);
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      hitSlop={hitSlop}
      disabled={disabled}
      style={inputBackground.style}
      id={id}
    >
      {inputBackground.element}
    </Pressable>
  );
});

FormCheckInputNative.displayName = 'FormCheckInputNative';

export default FormCheckInputNative;
