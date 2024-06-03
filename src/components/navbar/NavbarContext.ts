import { createContext } from 'react';
import { NavbarExpand, NavbarVariant } from '../../theme/types';

export type NavbarContextType = {
  expand?: NavbarExpand;
  expanded?: boolean;
  variant?: NavbarVariant;
  setExpanded: (expand: boolean) => void;
};

const NavbarContext = createContext<NavbarContextType | null>(null);

NavbarContext.displayName = 'NavbarContext';

export default NavbarContext;
