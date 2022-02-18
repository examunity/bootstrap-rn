import React from 'react';
import PropTypes from 'prop-types';
import { OverlayContainer } from '@react-native-aria/overlays';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Overlay from '../Overlay';
import View from '../View';
import useMedia from '../../hooks/useMedia';
import TextStyleProvider from '../../style/TextStyleProvider';
import { getStyles, concatRefs, convertToNumber } from '../../utils';
import useForcedContext from '../../hooks/useForcedContext';
import DropdownContext from './DropdownContext';

const ALIGNMENT_BREAKPOINTS = [true, 'sm', 'md', 'lg', 'xl', 'xxl'];

const propTypes = {
  children: PropTypes.node.isRequired,
  start: PropTypes.oneOf(ALIGNMENT_BREAKPOINTS),
  end: PropTypes.oneOf(ALIGNMENT_BREAKPOINTS),
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
  `,
  '.dropdown-menu-text': css`
    font-size: $dropdown-font-size;
    color: $dropdown-color;
    text-align: left; // Ensures proper alignment if parent has it changed (e.g., modal footer)
  `,
});

const getAlignment = (media, start, end) => {
  const alignStart = typeof start === 'boolean' ? start : media.up(start);
  const alignEnd = typeof end === 'boolean' ? end : media.up(end);

  if (!alignEnd) {
    return 'start';
  }

  if (!alignStart) {
    return 'end';
  }

  const startIndex = ALIGNMENT_BREAKPOINTS.indexOf(start);
  const endIndex = ALIGNMENT_BREAKPOINTS.indexOf(end);

  return startIndex > endIndex ? 'start' : 'end';
};

const transformPlacement = (media, direction, start, end) => {
  if (direction === 'start' || direction === 'end') {
    return `${direction} top`;
  }

  return `${direction} ${getAlignment(media, start, end)}`;
};

const DropdownMenu = React.forwardRef((props, ref) => {
  const { children, start = true, end = false, style, ...elementProps } = props;

  const dropdown = useForcedContext(DropdownContext);
  const media = useMedia();

  const { identifier, direction, triggerRef, visible } = dropdown;

  if (!visible) {
    return null;
  }

  const classes = getStyles(styles, ['.dropdown-menu']);
  const textClasses = getStyles(styles, ['.dropdown-menu-text']);

  return (
    <OverlayContainer>
      <Overlay
        placement={transformPlacement(media, direction, start, end)}
        targetRef={triggerRef}
        offset={convertToNumber(StyleSheet.value('dropdown-spacer'))}
        visible={visible}
      >
        {(overlay, overlayRef) => (
          <View
            {...elementProps}
            ref={concatRefs(overlayRef, ref)}
            accessibilityLabelledBy={identifier}
            style={[
              classes,
              style,
              { opacity: overlay.rendered ? 1 : 0 },
              overlay.overlayProps.style,
            ]}
          >
            <DropdownContext.Provider value={dropdown}>
              <TextStyleProvider style={textClasses}>
                {children}
              </TextStyleProvider>
            </DropdownContext.Provider>
          </View>
        )}
      </Overlay>
    </OverlayContainer>
  );
});

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.propTypes = propTypes;

export default DropdownMenu;
