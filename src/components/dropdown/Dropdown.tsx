import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View, { ViewProps, ViewRef } from '../View';
import { getStyles } from '../../utils';
import DropdownContext, { DropdownDirection } from './DropdownContext';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import DropdownHeader from './DropdownHeader';
import DropdownItem from './DropdownItem';
import DropdownItemText from './DropdownItemText';
import DropdownDivider from './DropdownDivider';
import useDropdown from './useDropdown';
import useDismissDropdown from './useDismissDropdown';
import useToggleDropdown from './useToggleDropdown';

export interface DropdownProps extends ViewProps {
  defaultVisible?: boolean;
  visible?: boolean;
  onToggle: () => void;
  direction?: DropdownDirection;
  center?: boolean;
  display?: 'dynamic' | 'static';
  autoClose?: boolean | 'inside' | 'outside';
}

const styles = StyleSheet.create({
  '.dropdown': css`
    position: relative;
  `,
});

const Dropdown = React.forwardRef<ViewRef, DropdownProps>((props, ref) => {
  const {
    children,
    defaultVisible = false,
    visible,
    onToggle,
    direction = 'down',
    center = false,
    display = 'dynamic',
    autoClose = 'outside',
    style,
    ...elementProps
  } = props;

  const dropdown = useDropdown(
    defaultVisible,
    visible,
    onToggle,
    direction,
    center,
    display,
    autoClose,
  );

  const classes = getStyles(styles, ['.dropdown']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      <DropdownContext.Provider value={dropdown}>
        {children}
      </DropdownContext.Provider>
    </View>
  );
});

Dropdown.displayName = 'Dropdown';

export default Object.assign(Dropdown, {
  Context: DropdownContext,
  Toggle: DropdownToggle,
  Menu: DropdownMenu,
  Header: DropdownHeader,
  Item: DropdownItem,
  ItemText: DropdownItemText,
  Divider: DropdownDivider,
  useDismiss: useDismissDropdown,
  useToggle: useToggleDropdown,
});
