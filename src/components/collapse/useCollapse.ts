import { useId, useMemo } from 'react';
import useControlledState from '../../hooks/useControlledState';

export default function useCollapse(
  defaultVisible: boolean,
  controlledVisible?: boolean,
  onToggle?: () => void,
) {
  const identifier = useId();

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
    [identifier, visible, setVisible],
  );
}
