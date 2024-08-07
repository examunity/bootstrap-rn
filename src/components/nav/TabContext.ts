import { createContext } from 'react';

export interface TabContextProps {
  identifier: string;
  activeTarget: string;
  setActiveTarget: (target: string) => void;
}

const TabContext = createContext<TabContextProps | null>(null);

TabContext.displayName = 'TabContext';

export default TabContext;
