import React from 'react';
import PropTypes from 'prop-types';
import useForcedContext from '../../hooks/useForcedContext';
import CheckInput from './CheckInput';
import RadioGroup from './RadioGroup';
import RadioContext from './RadioContext';

const propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
};

const Radio = React.forwardRef((props, ref) => {
  const { value, ...elementProps } = props;

  const context = useForcedContext(RadioContext);

  return (
    <CheckInput
      {...elementProps}
      ref={ref}
      type="radio"
      value={value === context.value}
      onChange={() => {
        context.onChange(value);
      }}
      disabled={context.disabled}
    />
  );
});

Radio.displayName = 'Radio';
Radio.propTypes = propTypes;

Radio.Group = RadioGroup;

export default Radio;
