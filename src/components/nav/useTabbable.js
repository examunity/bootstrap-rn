import { useMemo } from 'react';
import useIdentifier from '../../hooks/useIdentifier';
import useControlledState from '../../hooks/useControlledState';

export default function useTabbable(
  defaultActiveTarget,
  controlledActiveTarget,
  onChange,
) {
  const identifier = useIdentifier('tabbable');

  const [activeTarget, setActiveTarget] = useControlledState(
    defaultActiveTarget,
    controlledActiveTarget,
    onChange,
  );

  return useMemo(
    () => ({
      identifier,
      activeTarget,
      setActiveTarget,
    }),
    [activeTarget],
  );
}
