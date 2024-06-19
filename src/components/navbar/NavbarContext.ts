import { createContext } from 'react';

export type NavbarExpand = true | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type NavbarVariant = 'light' | 'dark';

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
