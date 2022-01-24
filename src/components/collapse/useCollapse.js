import { useMemo } from 'react';
import useIdentifier from '../../hooks/useIdentifier';
import useControlledState from '../../hooks/useControlledState';

export default function useCollapse(
  defaultVisible,
  controlledVisible,
  onToggle,
) {
  const identifier = useIdentifier('collapse');

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
    }),
    [visible],
  );
}
