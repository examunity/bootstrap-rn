import React from 'react';
import type { ViewStyle } from 'react-native';
import Pressable, { PressableRef } from '../../Pressable';
import useBackground from '../../../hooks/useBackground';
import type { FormCheckInputProps } from '../FormCheckInput';

export interface FormCheckInputNativeProps extends FormCheckInputProps {
  style: ViewStyle[];
}

function FormCheckInputNative(
  props: FormCheckInputNativeProps & React.RefAttributes<PressableRef>,
) {
  const {
    ref,
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
}

export default FormCheckInputNative;
