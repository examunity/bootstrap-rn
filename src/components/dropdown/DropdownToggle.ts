import React from 'react';
import useToggleDropdown, { UseToggleDropdownProps } from './useToggleDropdown';

type DropdownToggleProps = {
  children: (args: UseToggleDropdownProps) => React.ReactNode;
};

function DropdownToggle(props: DropdownToggleProps) {
  const { children } = props;

  const toggleProps = useToggleDropdown({});

  return children(toggleProps);
}

DropdownToggle.displayName = 'DropdownToggle';

export default DropdownToggle;
