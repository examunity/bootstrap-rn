import { createContext } from 'react';
import type { NavbarExpand, NavbarVariant } from '../../types';

export type NavbarContextType = {
  identifier: string;
  variant?: NavbarVariant;
  expanded?: boolean;
  setExpanded: (
    expanded: boolean | ((currentState: boolean) => boolean),
  ) => void;
  expand?: NavbarExpand;
};

const NavbarContext = createContext<NavbarContextType | null>(null);

NavbarContext.displayName = 'NavbarContext';

export default NavbarContext;
