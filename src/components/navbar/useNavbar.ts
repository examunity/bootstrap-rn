import { useId, useMemo } from 'react';
import useControlledState from '../../hooks/useControlledState';
import type { NavbarExpand, NavbarVariant } from './NavbarContext';

export default function useNavbar(
  variant: NavbarVariant,
  defaultExpanded: boolean,
  controlledExpanded?: boolean,
  onToggle?: () => void,
  expand?: NavbarExpand,
) {
  const identifier = useId();

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
    [identifier, variant, expanded, expand],
  );
}
