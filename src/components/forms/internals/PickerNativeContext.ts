import React from 'react';

type PickerNativeContextType = {
  selectedValue?: string | null | undefined;
  handleValueChange: (value: string) => void;
};

const PickerNativeContext = React.createContext<PickerNativeContextType | null>(
  null,
);

PickerNativeContext.displayName = 'PickerNativeContext';

export default PickerNativeContext;
