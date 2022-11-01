import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import PickerContext from './PickerContext';
import useForcedContext from '../../hooks/useForcedContext';
import PickerWebItem from './internals/PickerWebItem';
import PickerNativeItem from './internals/PickerNativeItem';

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

const PickerItem = React.forwardRef((props, ref) => {
  const { label, value, disabled = false } = props;

  const { useNativeComponent } = useForcedContext(PickerContext);

  const BasePickerItem =
    Platform.OS === 'web' && !useNativeComponent
      ? PickerWebItem
      : PickerNativeItem;

  return (
    <BasePickerItem ref={ref} label={label} value={value} disabled={disabled} />
  );
});

PickerItem.displayName = 'PickerItem';
PickerItem.propTypes = propTypes;

export default PickerItem;
