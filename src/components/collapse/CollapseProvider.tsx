import React from 'react'; // Import React and FC type
import CollapseContext from './CollapseContext';
import useCollapse from './useCollapse';

export interface CollapseProviderProps {
  children: React.ReactNode;
  defaultVisible?: boolean; // Make defaultVisible optional
  visible?: boolean;
  onToggle?: () => void;
}

function CollapseProvider(props: CollapseProviderProps) {
  const { children, defaultVisible = false, visible, onToggle } = props;

  const collapse = useCollapse(defaultVisible, visible, onToggle);

  return (
    <CollapseContext.Provider value={collapse}>
      {children}
    </CollapseContext.Provider>
  );
}

CollapseProvider.displayName = 'CollapseProvider';

export default CollapseProvider;
