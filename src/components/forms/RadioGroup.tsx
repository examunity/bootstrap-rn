import React, { useMemo } from 'react';
import View, { ViewProps, ViewRef } from '../View';
import RadioContext from './RadioContext';

export interface RadioGroupProps extends ViewProps {
  selectedValue?: boolean | number | string | object | null | undefined;
  // We cannot determine the type used for value in Radio components.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValueChange?: (value: any) => void;
  disabled?: boolean;
}

function RadioGroup(props: RadioGroupProps & React.RefAttributes<ViewRef>) {
  const {
    ref,
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
}

export default RadioGroup;
