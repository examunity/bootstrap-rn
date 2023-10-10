import React from 'react';
import {
  unstable_createElement as createElement,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import useBackground from '../../../hooks/useBackground';

const propTypes = {
  type: PropTypes.oneOf(['checkbox', 'radio', 'switch']).isRequired,
  value: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  id: PropTypes.any,
};

const styles = StyleSheet.create({
  reboot: {
    flexShrink: 0,
    margin: 0,
  },
});

// eslint-disable-next-line react/prop-types
const Input = React.forwardRef(({ style, ...props }, ref) =>
  createElement('input', { ...props, ref, style: [styles.reboot, style] }),
);

const FormCheckInputWeb = React.forwardRef((props, ref) => {
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
FormCheckInputWeb.propTypes = propTypes;

export default FormCheckInputWeb;
