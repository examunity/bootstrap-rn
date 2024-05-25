import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import View from '../View';
import RadioContext from './RadioContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  onValueChange: PropTypes.func,
  disabled: PropTypes.bool,
};

const RadioGroup = React.forwardRef((props, ref) => {
  const {
    children,
    selectedValue,
    onValueChange = () => {},
    disabled = false,
    ...elementProps
  } = props;

  const contextValue = useMemo(
    () => ({
      selectedValue,
      onValueChange,
      disabled,
    }),
    [selectedValue, onValueChange, disabled],
  );

  return (
    <View {...elementProps} ref={ref} role="radiogroup">
      <RadioContext.Provider value={contextValue}>
        {children}
      </RadioContext.Provider>
    </View>
  );
});

RadioGroup.displayName = 'RadioGroup';
RadioGroup.propTypes = propTypes;

export default RadioGroup;
