import { useMemo } from 'react';
import useIdentifier from '../../hooks/useIdentifier';
import useControlledState from '../../hooks/useControlledState';
import { NavbarExpand, NavbarVariant } from '../../theme/types';

interface UseNavbarReturn {
  identifier: string;
  variant?: NavbarVariant;
  expanded?: boolean;
  setExpanded: (expanded: boolean) => void;
  expand?: NavbarExpand;
}

export default function useNavbar(
  variant: NavbarVariant,
  defaultExpanded: boolean,
  controlledExpanded?: boolean,
  onToggle?: () => void,
  expand?: NavbarExpand,
): UseNavbarReturn {
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
