import React from 'react';
import {
  // @ts-expect-error web only import
  Picker as WebPicker,
} from 'react-native';
import useForcedContext from '../../../hooks/useForcedContext';
import PickerWebContext from './PickerWebContext';
import type { ViewProps, ViewRef } from '../../View';

export interface PickerItemProps extends ViewProps {
  label: string;
  value: string;
  disabled?: boolean;
}

function PickerItem(props: PickerItemProps & React.RefAttributes<ViewRef>) {
  const { ref, label, value, disabled = false } = props;

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
}

export default PickerItem;
