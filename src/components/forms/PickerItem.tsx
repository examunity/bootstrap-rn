import React from 'react';
import BasePickerItem from './internals/PickerItem';
import type { ViewProps, ViewRef } from '../View';

export interface PickerItemProps extends ViewProps {
  label: string;
  value: string;
  disabled?: boolean;
}

function PickerItem(props: PickerItemProps & React.RefAttributes<ViewRef>) {
  const { ref, label, value, disabled = false } = props;

  return (
    <BasePickerItem ref={ref} label={label} value={value} disabled={disabled} />
  );
}

export default PickerItem;
