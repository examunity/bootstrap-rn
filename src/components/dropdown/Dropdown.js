import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';
import DropdownContext from './DropdownContext';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import DropdownHeader from './DropdownHeader';
import DropdownItem from './DropdownItem';
import DropdownItemText from './DropdownItemText';
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
  display: PropTypes.oneOf(['dynamic', 'static']),
  autoClose: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['inside', 'outside']),
  ]),
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
Dropdown.propTypes = propTypes;

Dropdown.Context = DropdownContext;
Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Header = DropdownHeader;
Dropdown.Item = DropdownItem;
Dropdown.ItemText = DropdownItemText;
Dropdown.Divider = DropdownDivider;
Dropdown.useDismiss = useDismissDropdown;
Dropdown.useToggle = useToggleDropdown;

export default Dropdown;
