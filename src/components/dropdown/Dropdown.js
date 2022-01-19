import React from 'react';
import { useFloating, shift } from '@floating-ui/react-native';
import PropTypes from 'prop-types';
import View from '../View';
import Text from '../Text';
import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';
import DropdownItemText from './DropdownItemText';
import DropdownHeader from './DropdownHeader';
import DropdownDivider from './DropdownDivider';

const PLACEMENTS = ['top', 'bottom', 'left', 'right'];

const propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  placement: PropTypes.oneOf(PLACEMENTS),
};

const Dropdown = React.forwardRef((props) => {
  const { children, placement = 'bottom', visible = false } = props;

  const { x, y, reference, floating } = useFloating({
    placement,
    middleware: [shift()],
  });

  return (
    <>
      {visible && (
        <View>
          <View ref={reference}>
            <Text>Reference</Text>
          </View>
          <View
            ref={floating}
            style={{
              position: 'absolute',
              top: y ?? 0,
              left: x ?? 0,
              // zIndex: 1000,
            }}
          >
            {children}
          </View>
        </View>
      )}
    </>
  );
});

Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = propTypes;

Dropdown.ItemText = DropdownItemText;
Dropdown.Header = DropdownHeader;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;

export default Dropdown;
