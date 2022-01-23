import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import TextStyleProvider from '../../style/TextStyleProvider';
import { getStyles, concatRefs } from '../../utils';
import DropdownContext from './DropdownContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.dropdown-menu': css`
    position: absolute;
    z-index: $zindex-dropdown;
    // display: none; // none by default, but block on "open" of the menu
    min-width: $dropdown-min-width;
    padding: $dropdown-padding-y $dropdown-padding-x;
    margin: 0; // Override default margin of ul
    // list-style: none;
    background-color: $dropdown-bg;
    // background-clip: padding-box;
    border: $dropdown-border-width solid $dropdown-border-color;
    border-radius: $dropdown-border-radius;
    // @include box-shadow($dropdown-box-shadow);
    margin-top: $dropdown-spacer; // added for bootstyle
  `,
  '.dropdown-menu-text': css`
    font-size: $dropdown-font-size;
    color: $dropdown-color;
    text-align: left; // Ensures proper alignment if parent has it changed (e.g., modal footer)
  `,
});

const DropdownMenu = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const context = useContext(DropdownContext);

  invariant(
    context,
    'DropdownMenu can only be used inside a Dropdown component.',
  );

  const { identifier, visible, menuRef, menuPos } = context;

  if (!visible) {
    return null;
  }

  const classes = getStyles(styles, ['.dropdown-menu']);

  const textClasses = getStyles(styles, ['.dropdown-menu-text']);

  return (
    <View
      {...elementProps}
      ref={concatRefs(menuRef, ref)}
      accessibilityLabelledBy={identifier}
      style={[classes, { top: menuPos.y, left: menuPos.x }, style]}
    >
      <TextStyleProvider style={textClasses}>{children}</TextStyleProvider>
    </View>
  );
});

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.propTypes = propTypes;

export default DropdownMenu;
