import { createContext } from 'react';
import { NavVariant } from '../../types';

type NavContextType = {
  variant?: NavVariant;
};

const NavContext = createContext<NavContextType | null>(null);

NavContext.displayName = 'NavContext';

export default NavContext;
