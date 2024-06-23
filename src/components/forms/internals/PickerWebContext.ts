import React from 'react';
import type { ColorValue } from 'react-native';

type PickerWebContextType = {
  optionColor: ColorValue | null;
};

const PickerWebContext = React.createContext<PickerWebContextType | null>(null);

PickerWebContext.displayName = 'PickerWebContext';

export default PickerWebContext;
