import React, { useMemo, forwardRef } from 'react';
import {
  // @ts-expect-error web only import
  Picker as BasePicker,
  StyleSheet as StyleUtils,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TargetedEvent,
} from 'react-native';
import useBackground from '../../../hooks/useBackground';
import PickerWebContext from './PickerWebContext';

interface PickerWebProps {
  children: React.ReactNode;
  selectedValue: boolean | number | string | object | null | undefined;
  onValueChange?: (value: boolean | number | string | object) => void;
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  disabled?: boolean;
  style?: ViewStyle | TextStyle;
}

const PLACEHOLDER = '__PLACEHOLDER__';

const getOptionStyle = (
  style: ViewStyle | TextStyle,
  showPlaceholder: boolean,
) => {
  if (!showPlaceholder) {
    return null;
  }

  const flattenedStyle = StyleUtils.flatten(style);

  return flattenedStyle.color || null;
};

const PickerWeb = forwardRef<BasePicker, PickerWebProps>((props, ref) => {
  const {
    children,
    selectedValue,
    onValueChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    placeholder,
    placeholderTextColor,
    disabled,
    style,
    ...elementProps
  } = props;

  const background = useBackground(style);

  const showPlaceholder = selectedValue === undefined || selectedValue === null;

  const contextValue = useMemo(
    () => ({
      optionColor: getOptionStyle(background.style, showPlaceholder),
    }),
    [background, showPlaceholder],
  );

  return (
    <BasePicker
      {...elementProps}
      ref={ref}
      selectedValue={showPlaceholder ? PLACEHOLDER : selectedValue}
      onValueChange={onValueChange}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      style={[
        background.style,
        showPlaceholder && { color: placeholderTextColor },
      ]}
    >
      <option value={PLACEHOLDER} disabled hidden>
        {placeholder}
      </option>
      <PickerWebContext.Provider value={contextValue}>
        {children}
      </PickerWebContext.Provider>
    </BasePicker>
  );
});

export default PickerWeb;
