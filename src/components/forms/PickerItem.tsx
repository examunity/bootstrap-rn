import React from 'react';
import { Platform } from 'react-native';
import PickerContext from './PickerContext';
import useForcedContext from '../../hooks/useForcedContext';
import PickerWebItem from './internals/PickerWebItem';
import PickerNativeItem from './internals/PickerNativeItem';
import { ViewRef } from '../View';

export type PickerItemProps = {
  label: string;
  value?: boolean | number | string | object;
  disabled?: boolean;
};

const PickerItem = React.forwardRef<ViewRef, PickerItemProps>((props, ref) => {
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

export default PickerItem;
