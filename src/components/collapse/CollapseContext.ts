import { createContext } from 'react';

type CollapseContextType = {
  identifier: string;
  visible: boolean;
};

const CollapseContext = createContext<CollapseContextType | null>(null);

CollapseContext.displayName = 'CollapseContext';

export default CollapseContext;
