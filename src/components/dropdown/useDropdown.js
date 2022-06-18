import { useMemo, useRef } from 'react';
import useIdentifier from '../../hooks/useIdentifier';
import useControlledState from '../../hooks/useControlledState';

export default function useDropdown(
  defaultVisible,
  controlledVisible,
  onToggle,
  direction,
  autoClose,
) {
  const identifier = useIdentifier('dropdown');

  const toggleRef = useRef();

  const [visible, setVisible] = useControlledState(
    defaultVisible,
    controlledVisible,
    onToggle,
  );

  return useMemo(
    () => ({
      identifier,
      visible,
      setVisible,
      toggleRef,
      direction,
      autoClose,
    }),
    [visible],
  );
}
