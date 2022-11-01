import React from 'react';
import PropTypes from 'prop-types';
import useForcedContext from '../../hooks/useForcedContext';
import FormCheckInput from './FormCheckInput';
import RadioGroup from './RadioGroup';
import RadioContext from './RadioContext';

const propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
};

const Radio = React.forwardRef((props, ref) => {
  const { value, ...elementProps } = props;

  const { selectedValue, onValueChange, disabled } = useForcedContext(
    RadioContext,
  );

  return (
    <FormCheckInput
      {...elementProps}
      ref={ref}
      type="radio"
      value={value === selectedValue}
      onValueChange={() => {
        onValueChange(value);
      }}
      disabled={disabled}
    />
  );
});

Radio.displayName = 'Radio';
Radio.propTypes = propTypes;

Radio.Group = RadioGroup;

export default Radio;
