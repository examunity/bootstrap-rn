import React, { useMemo } from 'react';
import View, { ViewProps, ViewRef } from '../View';
import RadioContext from './RadioContext';

export interface RadioGroupProps extends ViewProps {
  selectedValue?: boolean | number | string | object;
  onValueChange?: (value?: boolean | number | string | object) => void;
  disabled?: boolean;
}

const RadioGroup = React.forwardRef<ViewRef, RadioGroupProps>((props, ref) => {
  const {
    children,
    selectedValue,
    onValueChange = () => {},
    disabled = false,
    ...elementProps
  } = props;

  const contextValue = useMemo(
    () => ({
      selectedValue,
      onValueChange,
      disabled,
    }),
    [selectedValue, onValueChange, disabled],
  );

  return (
    <View {...elementProps} ref={ref} role="radiogroup">
      <RadioContext.Provider value={contextValue}>
        {children}
      </RadioContext.Provider>
    </View>
  );
});

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
