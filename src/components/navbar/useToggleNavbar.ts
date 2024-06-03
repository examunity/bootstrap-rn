import { useState } from 'react';

// Define the type for the handleChange function
type HandleChange<T> = (value: T) => void;

// Define the type for the setValue function
type SetValue<T> = (value: T | ((prevValue: T) => T)) => void;

// Define the type for the useControlledState hook
function useControlledState<T>(
  defaultValue: T,
  controlledValue?: T | undefined,
  handleChange: HandleChange<T> = () => {},
): [T, SetValue<T>] {
  const [stateValue, setStateValue] = useState<T>(defaultValue);

  const isControlled =
    controlledValue !== undefined && controlledValue !== null;

  const value = isControlled ? controlledValue : stateValue;

  const setValue: SetValue<T> = (next) => {
    const nextValue =
      typeof next === 'function' ? (next as (prevValue: T) => T)(value) : next;

    if (value === nextValue) {
      return;
    }

    if (!isControlled) {
      setStateValue(nextValue);
    }

    handleChange(nextValue);
  };

  return [value, setValue];
}

export default useControlledState;
