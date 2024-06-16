import React from 'react';

type PickerWebContextType = {
  optionColor: string;
};

const PickerWebContext = React.createContext<PickerWebContextType | null>(null);

PickerWebContext.displayName = 'PickerWebContext';

export default PickerWebContext;
