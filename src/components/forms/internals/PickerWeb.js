import React from 'react';
import { Picker as BasePicker, StyleSheet as StyleUtils } from 'react-native';
import PropTypes from 'prop-types';
import useBackground from '../../../hooks/useBackground';
import PickerWebContext from './PickerWebContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  onValueChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  nativeID: PropTypes.any,
};

const PLACEHOLDER = '__PLACEHOLDER__';

const getOptionStyle = (style, showPlaceholder) => {
  if (!showPlaceholder) {
    return null;
  }

  const flattenedStyle = StyleUtils.flatten(style);

  return flattenedStyle.color;
};

const PickerWeb = React.forwardRef((props, ref) => {
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
    nativeID,
  } = props;

  const background = useBackground(style);

  const showPlaceholder =
    placeholder && (selectedValue === undefined || selectedValue === null);

  return (
    <BasePicker
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
      nativeID={nativeID}
    >
      {placeholder && (
        <option value={PLACEHOLDER} disabled hidden>
          {placeholder}
        </option>
      )}
      <PickerWebContext.Provider
        value={{
          optionColor: getOptionStyle(background.style, showPlaceholder),
        }}
      >
        {children}
      </PickerWebContext.Provider>
    </BasePicker>
  );
});

PickerWeb.propTypes = propTypes;

export default PickerWeb;