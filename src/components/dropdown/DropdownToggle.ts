import React from 'react';
import useToggleDropdown from './useToggleDropdown';

export interface DropdownToggleProps {
  children: (args: ReturnType<typeof useToggleDropdown>) => React.ReactNode;
}

function DropdownToggle(props: DropdownToggleProps) {
  const { children } = props;

  const toggleProps = useToggleDropdown({});

  return children(toggleProps);
}

DropdownToggle.displayName = 'DropdownToggle';

export default DropdownToggle;
