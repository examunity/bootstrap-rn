import React from 'react';

type PickerWebContextType = {
  optionColor: unknown;
};
const PickerWebContext = React.createContext<PickerWebContextType | null>(null);

PickerWebContext.displayName = 'PickerWebContext';

export default PickerWebContext;
