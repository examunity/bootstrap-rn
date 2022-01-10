import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CheckInput from './CheckInput';
import RadioGroup from './RadioGroup';
import RadioContext from './RadioContext';

const propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

const Radio = React.forwardRef((props, ref) => {
  const { value, ...elementProps } = props;

  const context = useContext(RadioContext);

  const handleChange = () => {
    context.onChange(value);
  };

  return (
    <CheckInput
      {...elementProps}
      ref={ref}
      type="radio"
      value={value === context.value}
      onChange={handleChange}
      disabled={context.disabled}
    />
  );
});

Radio.displayName = 'Radio';
Radio.propTypes = propTypes;

Radio.Group = RadioGroup;

export default Radio;
