import React from 'react';
import { Platform } from 'react-native';
import PickerContext from './PickerContext';
import useForcedContext from '../../hooks/useForcedContext';
import PickerWebItem from './internals/PickerWebItem';
import PickerNativeItem from './internals/PickerNativeItem';
import type { ViewProps, ViewRef } from '../View';

export interface PickerItemProps extends ViewProps {
  label: string;
  value: string;
  disabled?: boolean;
}

function PickerItem(props: PickerItemProps & React.RefAttributes<ViewRef>) {
  const { ref, label, value, disabled = false } = props;

  const { useNativeComponent } = useForcedContext(PickerContext);

  const BasePickerItem =
    Platform.OS === 'web' && !useNativeComponent
      ? PickerWebItem
      : PickerNativeItem;

  return (
    <BasePickerItem ref={ref} label={label} value={value} disabled={disabled} />
  );
}

export default PickerItem;
