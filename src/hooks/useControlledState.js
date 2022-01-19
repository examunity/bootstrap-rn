import { useState } from 'react';

export default function useControlledState(
  defaultValue,
  controlledValue,
  onChange = () => {},
) {
  const [stateValue, setStateValue] = useState(defaultValue);

  const isControlled = typeof controlledValue === 'boolean';

  const value = isControlled ? controlledValue : stateValue;

  const setValue = (nextValue) => {
    if (value === nextValue) {
      return;
    }

    if (!isControlled) {
      setStateValue(nextValue);
    }

    onChange(nextValue);
  };

  return [value, setValue];
}
