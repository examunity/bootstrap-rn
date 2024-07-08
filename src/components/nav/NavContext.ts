import { createContext } from 'react';

export type NavVariant = 'tabs' | 'pills';

type NavContextType = {
  variant?: NavVariant;
};

const NavContext = createContext<NavContextType | null>(null);

NavContext.displayName = 'NavContext';

export default NavContext;
