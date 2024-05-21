import React, { useMemo } from 'react';
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

PickerWeb.propTypes = propTypes;

export default PickerWeb;
