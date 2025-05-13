import React, { useMemo, forwardRef } from 'react';
import {
  // @ts-expect-error web only import
  Picker as BasePicker,
  StyleSheet as StyleUtils,
  TextStyle,
} from 'react-native';
import useBackground from '../../../hooks/useBackground';
import PickerWebContext from './PickerWebContext';
import type { PickerProps } from '../Picker';
import type { PressableRef } from '../../Pressable';

interface PickerWebProps extends PickerProps {
  style: TextStyle[];
}

const PLACEHOLDER = '__PLACEHOLDER__';

const getOptionStyle = (
  style: ReturnType<typeof useBackground>['style'],
  showPlaceholder: boolean,
) => {
  if (!showPlaceholder) {
    return null;
  }

  const flattenedStyle = StyleUtils.flatten(style);

  if ('color' in flattenedStyle && flattenedStyle.color !== undefined) {
    return flattenedStyle.color;
  }

  return null;
};

const PickerWeb = forwardRef<PressableRef, PickerWebProps>((props, ref) => {
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
