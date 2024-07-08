import { useMemo } from 'react';
import useIdentifier from '../../hooks/useIdentifier';
import useControlledState from '../../hooks/useControlledState';
import type { NavbarExpand, NavbarVariant } from './NavbarContext';

export default function useNavbar(
  variant: NavbarVariant,
  defaultExpanded: boolean,
  controlledExpanded?: boolean,
  onToggle?: () => void,
  expand?: NavbarExpand,
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
    [identifier, variant, expanded, expand],
  );
}
