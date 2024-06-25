import React, { forwardRef } from 'react';
import Pressable, { PressableRef } from '../../Pressable';
import useBackground from '../../../hooks/useBackground';
import { ExtendedViewStyle, StyleProp } from '../../../types';

type FormCheckInputNativeProps = {
  type: 'checkbox' | 'radio' | 'switch';
  value: boolean;
  onValueChange?: (value?: boolean) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  hitSlop?: number;
  disabled?: boolean;
  style?: StyleProp<ExtendedViewStyle>;
  autoFocus?: boolean;
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
    autoFocus,
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
      autoFocus={autoFocus}
      id={id}
    >
      {inputBackground.element}
    </Pressable>
  );
});

FormCheckInputNative.displayName = 'FormCheckInputNative';

export default FormCheckInputNative;
