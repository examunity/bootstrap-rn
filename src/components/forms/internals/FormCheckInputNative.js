import React from 'react';
import PropTypes from 'prop-types';
import Pressable from '../../Pressable';
import useBackground from '../../../hooks/useBackground';

const propTypes = {
  type: PropTypes.oneOf(['checkbox', 'radio', 'switch']).isRequired,
  value: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  hitSlop: PropTypes.number,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  nativeID: PropTypes.any,
};

const FormCheckInputNative = React.forwardRef((props, ref) => {
  const {
    type,
    value,
    onValueChange: handleValueChange,
    onFocus = () => {},
    onBlur = () => {},
    hitSlop = 8,
    disabled = false,
    style,
    nativeID,
  } = props;

  const inputBackground = useBackground(style);

  return (
    <Pressable
      ref={ref}
      accessibilityRole={type}
      accessibilityChecked={value}
      onPress={() => {
        handleValueChange(!value);
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      hitSlop={hitSlop}
      disabled={disabled}
      style={inputBackground.style}
      nativeID={nativeID}
    >
      {inputBackground.element}
    </Pressable>
  );
});

FormCheckInputNative.displayName = 'FormCheckInputNative';
FormCheckInputNative.propTypes = propTypes;

export default FormCheckInputNative;
