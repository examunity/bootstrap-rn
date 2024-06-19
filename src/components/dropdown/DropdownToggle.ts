import React from 'react';
import useToggleDropdown, { ToggleDropdownProps } from './useToggleDropdown';

type DropdownToggleProps = {
  children: (args: ToggleDropdownProps) => React.ReactNode;
};

function DropdownToggle(props: DropdownToggleProps) {
  const { children } = props;

  const toggleProps = useToggleDropdown({});

  return children(toggleProps);
}

DropdownToggle.displayName = 'DropdownToggle';

export default DropdownToggle;
