import { useMemo, useRef } from 'react';
import useIdentifier from '../../hooks/useIdentifier';
import useControlledState from '../../hooks/useControlledState';
import { DropDownDirection } from '../../types';

export default function useDropdown(
  defaultVisible: boolean,
  controlledVisible: boolean | undefined,
  onToggle: () => void,
  direction: DropDownDirection,
  center: boolean,
  display: string,
  autoClose: string | boolean,
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
      center,
      display,
      autoClose,
    }),
    [visible, direction, center, display, autoClose],
  );
}
