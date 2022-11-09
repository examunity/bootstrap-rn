import { useState } from 'react';

export default function useControlledState(
  defaultValue,
  controlledValue,
  handleChange = () => {},
) {
  const [stateValue, setStateValue] = useState(defaultValue);

  const isControlled =
    controlledValue !== undefined && controlledValue !== null;

  const value = isControlled ? controlledValue : stateValue;

  const setValue = (next) => {
    const nextValue = typeof next === 'function' ? next(value) : next;

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
