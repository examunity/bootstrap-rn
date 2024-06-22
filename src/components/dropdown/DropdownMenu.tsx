import React, { useContext, useRef } from 'react';
import { Platform } from 'react-native';
import { OverlayContainer } from '@react-native-aria/overlays';
import type { Placement } from '@react-types/overlays';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Overlay from '../helpers/Overlay';
import BackdropHandler from '../helpers/BackdropHandler';
import View, { ViewProps, ViewRef } from '../View';
import useMedia from '../../hooks/useMedia';
import { GRID_BREAKPOINTS } from '../../theme/proxies';
import { infix, next } from '../../theme/breakpoints';
import { getStyles, each, concatRefs } from '../../utils';
import { normalizeNumber } from '../../style/math';
import useForcedContext from '../../hooks/useForcedContext';
import NavbarContext from '../navbar/NavbarContext';
import DropdownContext, { DropdownDirection } from './DropdownContext';
import type { MediaHandler } from '../../types';

type AlignmentBreakpoints = boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface DropdownProps extends ViewProps {
  start?: AlignmentBreakpoints;
  right?: AlignmentBreakpoints;
  end?: AlignmentBreakpoints;
}

const ALIGNMENT_BREAKPOINTS = [true, 'sm', 'md', 'lg', 'xl', 'xxl'];

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
  '.dropdown-menu[data-bs-popper]': css`
    top: 100%;
    left: 0;
    margin-top: $dropdown-spacer;
  `,
  ...each(GRID_BREAKPOINTS, (breakpoint) => ({
    [`.dropdown-menu${infix(breakpoint)}-start[data-bs-popper]`]: css`
      @include media-breakpoint-up(${breakpoint}) {
        right: auto;
        left: 0;
      }
    `,
    [`.dropdown-menu${infix(breakpoint)}-end[data-bs-popper]`]: css`
      @include media-breakpoint-up(${breakpoint}) {
        right: 0;
        left: auto;
      }
    `,
  })),
  '.dropup .dropdown-menu[data-bs-popper]': css`
    top: auto;
    bottom: 100%;
    margin-top: 0;
    margin-bottom: $dropdown-spacer;
  `,
  '.dropend .dropdown-menu[data-bs-popper]': css`
    top: 0;
    right: auto;
    left: 100%;
    margin-top: 0;
    margin-left: $dropdown-spacer;
  `,
  '.dropstart .dropdown-menu[data-bs-popper]': css`
    top: 0;
    right: 100%;
    left: auto;
    margin-top: 0;
    margin-right: $dropdown-spacer;
  `,
  '.navbar-nav .dropdown-menu': css`
    position: relative; // static;
  `,
  ...each(GRID_BREAKPOINTS, (breakpoint) => ({
    [`.navbar-expand${infix(next(breakpoint))} .navbar-nav .dropdown-menu`]: css`
      @include media-breakpoint-up(${next(breakpoint)}) {
        position: absolute;
      }
    `,
  })),
  '.dropdown-menu --text': css`
    font-size: $dropdown-font-size;
    color: $dropdown-color;
    text-align: left; // Ensures proper alignment if parent has it changed (e.g., modal footer)
  `,
});

const getAlignment = (
  media: MediaHandler,
  start: AlignmentBreakpoints,
  end: AlignmentBreakpoints,
) => {
  const alignEnd = typeof end === 'boolean' ? end : media.up(end);

  if (!alignEnd) {
    return 'start';
  }

  const alignStart = typeof start === 'boolean' ? start : media.up(start);

  if (!alignStart) {
    return 'end';
  }

  const startIndex = ALIGNMENT_BREAKPOINTS.indexOf(start);
  const endIndex = ALIGNMENT_BREAKPOINTS.indexOf(end);

  return startIndex > endIndex ? 'start' : 'end';
};

const transformPlacement = (
  media: MediaHandler,
  direction: DropdownDirection,
  start: AlignmentBreakpoints,
  end: AlignmentBreakpoints,
) => {
  if (direction === 'up') {
    return `top ${getAlignment(media, start, end)}` as Placement;
  }

  if (direction === 'down') {
    return `bottom ${getAlignment(media, start, end)}` as Placement;
  }

  return `${direction} top` as Placement;
};

const DropdownMenu = React.forwardRef<ViewRef, DropdownProps>((props, ref) => {
  const {
    children,
    start = true,
    right,
    end = false,
    style,
    textStyle,
    ...elementProps
  } = props;

  if (right !== undefined) {
    // eslint-disable-next-line no-console
    console.warn('Prop "right" is deprecated, please use "end" instead.');
  }

  const navbar = useContext(NavbarContext);
  const media = useMedia();
  const dialogRef = useRef(null);

  const dropdown = useForcedContext(DropdownContext);

  const {
    identifier,
    toggleRef,
    visible,
    setVisible,
    direction,
    display,
    autoClose,
  } = dropdown;

  if (!visible) {
    return null;
  }

  const isStatic = Platform.OS === 'web' && display === 'static';
  const isCollapsedNavbar =
    navbar &&
    !(navbar.expand && (navbar.expand === true || media.up(navbar.expand)));
  const hasStaticStyle = isStatic && !isCollapsedNavbar;

  const classes = getStyles(styles, [
    '.dropdown-menu',
    // Non-Popper styles
    hasStaticStyle && '.dropdown-menu[data-bs-popper]',
    hasStaticStyle &&
      start &&
      `.dropdown-menu${
        start === true ? '' : `-${start}`
      }-start[data-bs-popper]`,
    hasStaticStyle &&
      end &&
      `.dropdown-menu${end === true ? '' : `-${end}`}-end[data-bs-popper]`,
    hasStaticStyle &&
      direction === 'up' &&
      '.dropup .dropdown-menu[data-bs-popper]',
    hasStaticStyle &&
      direction === 'end' &&
      '.dropend .dropdown-menu[data-bs-popper]',
    hasStaticStyle &&
      direction === 'start' &&
      '.dropstart .dropdown-menu[data-bs-popper]',
    // Navbar styles
    navbar && '.navbar-nav .dropdown-menu',
    navbar &&
      navbar.expand &&
      `.navbar-expand${
        navbar.expand === true ? '' : `-${navbar.expand}`
      } .navbar-nav .dropdown-menu`,
  ]);
  const textClasses = getStyles(styles, ['.dropdown-menu --text']);

  if (isStatic || isCollapsedNavbar) {
    return (
      <>
        {!isCollapsedNavbar && (
          <BackdropHandler
            toggleRef={toggleRef}
            dialogRef={dialogRef}
            onClose={() => {
              setVisible(false);
            }}
            autoClose={autoClose}
          />
        )}
        <View
          {...elementProps}
          ref={concatRefs(dialogRef, ref)}
          aria-labelledby={identifier}
          style={[classes, style]}
          textStyle={[textClasses, textStyle]}
        >
          {children}
        </View>
      </>
    );
  }

  return (
    <OverlayContainer>
      <Overlay
        placement={transformPlacement(media, direction, start, end)}
        targetRef={toggleRef}
        offset={normalizeNumber(StyleSheet.value('dropdown-spacer'))}
        visible={visible}
      >
        {(overlay, overlayRef) => (
          <>
            <BackdropHandler
              toggleRef={toggleRef}
              dialogRef={overlayRef}
              onClose={() => {
                setVisible(false);
              }}
              autoClose={autoClose}
            />
            <View
              {...elementProps}
              ref={concatRefs(overlayRef, ref)}
              aria-labelledby={identifier}
              style={[
                classes,
                overlay.overlayProps.style,
                { maxHeight: 'auto', opacity: overlay.rendered ? 1 : 0 },
                style,
              ]}
              textStyle={[textClasses, textStyle]}
            >
              <DropdownContext.Provider value={dropdown}>
                {children}
              </DropdownContext.Provider>
            </View>
          </>
        )}
      </Overlay>
    </OverlayContainer>
  );
});

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
