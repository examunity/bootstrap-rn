import { useMemo } from 'react';
import useIdentifier from '../../hooks/useIdentifier';
import useControlledState from '../../hooks/useControlledState';

type UseTabbableReturnType = {
  identifier: string;
  activeTarget: string;
  setActiveTarget: (target: string) => void;
};

export default function useTabbable(
  defaultActiveTarget: string,
  controlledActiveTarget?: string,
  onChange?: () => void,
): UseTabbableReturnType {
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
