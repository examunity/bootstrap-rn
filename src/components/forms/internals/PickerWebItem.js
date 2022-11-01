import React from 'react';
import { Picker as WebPicker } from 'react-native';
import PropTypes from 'prop-types';
import useForcedContext from '../../../hooks/useForcedContext';
import PickerWebContext from './PickerWebContext';

const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  disabled: PropTypes.bool,
};

const PickerWebItem = React.forwardRef((props, ref) => {
  const { label, value, disabled = false } = props;

  const { optionColor } = useForcedContext(PickerWebContext);

  return (
    <WebPicker.Item
      ref={ref}
      label={label}
      value={value}
      disabled={disabled}
      color={optionColor}
    />
  );
});

PickerWebItem.displayName = 'PickerWebItem';
PickerWebItem.propTypes = propTypes;

export default PickerWebItem;
