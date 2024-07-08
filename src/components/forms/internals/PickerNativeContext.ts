import React from 'react';

type PickerNativeContextType = {
  selectedValue?: boolean | number | string | object;
  handleValueChange: (value?: boolean | number | string | object) => void;
};

const PickerNativeContext = React.createContext<PickerNativeContextType | null>(
  null,
);

PickerNativeContext.displayName = 'PickerNativeContext';

export default PickerNativeContext;
