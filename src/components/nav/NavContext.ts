import { createContext } from 'react';
import { NavVariant } from '../../theme/types';

export type NavContextType = {
  variant?: NavVariant;
};

const NavContext = createContext<NavContextType | null>(null);

NavContext.displayName = 'NavContext';

export default NavContext;
