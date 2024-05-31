import { createContext } from 'react';

interface NavbarContextType {
  expand: boolean;
}

const NavbarContext = createContext<NavbarContextType | null>(null);

NavbarContext.displayName = 'NavbarContext';

export default NavbarContext;
