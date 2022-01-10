import React from 'react';
import PropTypes from 'prop-types';
import View from '../View';
import RadioContext from './RadioContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

const RadioGroup = React.forwardRef((props, ref) => {
  const {
    children,
    value,
    onChange = () => {},
    disabled = false,
    ...elementProps
  } = props;

  return (
    <View {...elementProps} ref={ref} accessibilityRole="radiogroup">
      <RadioContext.Provider value={{ value, onChange, disabled }}>
        {children}
      </RadioContext.Provider>
    </View>
  );
});

RadioGroup.displayName = 'RadioGroup';
RadioGroup.propTypes = propTypes;

export default RadioGroup;
