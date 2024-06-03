import React from 'react';
import TabContext from './TabContext';
import useTabbable from './useTabbable';

export type TabProviderProps = {
  children: React.ReactNode;
  defaultActiveTarget: string;
  activeTarget: string;
  onChange: () => void;
};

function TabProvider(props: TabProviderProps) {
  const { children, defaultActiveTarget, activeTarget, onChange } = props;

  const tabbable = useTabbable(defaultActiveTarget, activeTarget, onChange);

  return <TabContext.Provider value={tabbable}>{children}</TabContext.Provider>;
}

TabProvider.displayName = 'TabProvider';

export default TabProvider;
