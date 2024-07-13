import { createContext } from 'react';

export type NavVariant = 'tabs' | 'pills';

export interface NavContextProps {
  variant?: NavVariant;
}

const NavContext = createContext<NavContextProps | null>(null);

NavContext.displayName = 'NavContext';

export default NavContext;
