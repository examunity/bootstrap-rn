import { useState, Dispatch, SetStateAction } from 'react';

type UseControlledState<T> = [T, Dispatch<SetStateAction<T>>];

export default function useControlledState<T>(
  defaultValue: T,
  controlledValue: T | undefined,
  handleChange: (value: T) => void = () => {},
): UseControlledState<T> {
  const [stateValue, setStateValue] = useState<T>(defaultValue);

  const isControlled =
    controlledValue !== undefined && controlledValue !== null;

  const value = isControlled ? controlledValue : stateValue;

  const setValue: Dispatch<SetStateAction<T>> = (next: SetStateAction<T>) => {
    const nextValue =
      typeof next === 'function' ? (next as (prevValue: T) => T)(value) : next;

    if (value === nextValue) {
      return;
    }

    if (!isControlled) {
      setStateValue(next);
    }

    handleChange(nextValue);
  };

  return [value, setValue];
}
