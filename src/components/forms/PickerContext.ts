import React from 'react';

type PickerContextType = {
  useNativeComponent?: boolean;
};

const PickerContext = React.createContext<PickerContextType | null>(null);

PickerContext.displayName = 'PickerContext';

export default PickerContext;
