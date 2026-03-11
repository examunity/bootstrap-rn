import React from 'react';
import {
  // @ts-expect-error web only import
  Picker as WebPicker,
} from 'react-native';
import useForcedContext from '../../../hooks/useForcedContext';
import PickerWebContext from './PickerWebContext';
import type { ViewProps, ViewRef } from '../../View';

export interface PickerWebItemProps extends ViewProps {
  label: string;
  value: string;
  disabled?: boolean;
}

function PickerWebItem(
  props: PickerWebItemProps & React.RefAttributes<ViewRef>,
) {
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

export default PickerWebItem;
