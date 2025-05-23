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

const PickerWebItem = React.forwardRef<ViewRef, PickerWebItemProps>(
  (props, ref) => {
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
  },
);

PickerWebItem.displayName = 'PickerWebItem';

export default PickerWebItem;
