import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';
import DropdownContext from './DropdownContext';
import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';
import DropdownItemText from './DropdownItemText';
import DropdownHeader from './DropdownHeader';
import DropdownDivider from './DropdownDivider';
import useDropdown from './useDropdown';
import useDismissDropdown from './useDismissDropdown';
import useToggleDropdown from './useToggleDropdown';

const DIRECTIONS = ['top', 'bottom', 'start', 'end'];

const propTypes = {
  children: PropTypes.node,
  defaultVisible: PropTypes.bool,
  visible: PropTypes.bool,
  onToggle: PropTypes.func,
  direction: PropTypes.oneOf(DIRECTIONS),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.dropdown': css`
    position: relative;
  `,
});

const Dropdown = React.forwardRef((props, ref) => {
  const {
    children,
    defaultVisible = false,
    visible,
    onToggle,
    direction = 'bottom',
    style,
    ...elementProps
  } = props;

  const dropdown = useDropdown(defaultVisible, visible, onToggle, direction);

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
Dropdown.propTypes = propTypes;

Dropdown.Context = DropdownContext;
Dropdown.ItemText = DropdownItemText;
Dropdown.Header = DropdownHeader;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;
Dropdown.useDismiss = useDismissDropdown;
Dropdown.useToggle = useToggleDropdown;

export default Dropdown;
