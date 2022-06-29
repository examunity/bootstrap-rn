import { useMemo } from 'react';
import useIdentifier from '../../hooks/useIdentifier';
import useControlledState from '../../hooks/useControlledState';

export default function useNavbar(
  variant,
  defaultExpanded,
  controlledExpanded,
  onToggle,
  expand,
) {
  const identifier = useIdentifier('navbar');

  const [expanded, setExpanded] = useControlledState(
    defaultExpanded,
    controlledExpanded,
    onToggle,
  );

  return useMemo(
    () => ({
      identifier,
      variant,
      expanded,
      setExpanded,
      expand,
    }),
    [variant, expanded, expand],
  );
}
