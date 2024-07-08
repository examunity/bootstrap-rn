import { createContext } from 'react';

export type TabContextType = {
  identifier: string;
  activeTarget: string;
  setActiveTarget: (target: string) => void;
};

const TabContext = createContext<TabContextType | null>(null);

TabContext.displayName = 'TabContext';

export default TabContext;
