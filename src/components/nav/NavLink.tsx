import React, { useContext } from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Pressable from '../Pressable';
import { GRID_BREAKPOINTS } from '../../theme/proxies';
import { infix, next } from '../../theme/breakpoints';
import { getStyles, each } from '../../utils';
import useModifier from '../../hooks/useModifier';
import useForcedContext from '../../hooks/useForcedContext';
import NavbarContext from '../navbar/NavbarContext';
import NavContext from './NavContext';
import { ViewRef } from '../View';
import { ExtendedTextStyle, StyleProp } from '../../types';

export type NavLinkProps = {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  style?: StyleProp<ExtendedTextStyle>;
  activeStyle?: StyleProp<ExtendedTextStyle>;
  textStyle?: StyleProp<ExtendedTextStyle>;
  activeTextStyle?: StyleProp<ExtendedTextStyle>;
};

const styles = StyleSheet.create({
  '.nav-link': css`
    // display: block;
    flex-direction: row; // added for bootstrap-rn
    align-items: center; // added for bootstrap-rn
    padding: $nav-link-padding-y $nav-link-padding-x;
    // @include transition($nav-link-transition);
  `,
  '.nav-link --text': css`
    font-size: $nav-link-font-size;
    font-weight: $nav-link-font-weight;
    color: $nav-link-color;
    text-decoration: none; // if($link-decoration == none, null, none);

    &:hover {
      color: $nav-link-hover-color;
      text-decoration: none; // if($link-hover-decoration == underline, none, null);
    }
    &:focus {
      color: $nav-link-hover-color;
      text-decoration: none; // if($link-hover-decoration == underline, none, null);
    }
  `,
  '.nav-link.disabled': css`
    @include platform(web) {
      pointer-events: none;
      cursor: default;
    }
  `,
  '.nav-link.disabled --text': css`
    color: $nav-link-disabled-color;
  `,
  '.nav-tabs .nav-link': css`
    margin-bottom: -$nav-tabs-border-width;
    background: transparent; // none;
    // Use longform for border, so that the border color is applied correctly on Android.
    border-width: $nav-tabs-border-width;
    border-style: solid;
    border-color: transparent transparent;
    border-top-left-radius: $nav-tabs-border-radius;
    border-top-right-radius: $nav-tabs-border-radius;

    &:hover {
      // Prevents active .nav-link tab overlapping focus outline of previous/next .nav-link
      // isolation: isolate;
      border-color: $nav-tabs-link-hover-border-color;
    }
    &:focus {
      // Prevents active .nav-link tab overlapping focus outline of previous/next .nav-link
      // isolation: isolate;
      border-color: $nav-tabs-link-hover-border-color;
    }
  `,
  '.nav-tabs .nav-link.disabled': css`
    background-color: transparent;
    border-color: transparent;
  `,
  '.nav-tabs .nav-link.disabled --text': css`
    color: $nav-link-disabled-color;
  `,
  '.nav-tabs .nav-link.active': css`
    background-color: $nav-tabs-link-active-bg;
    border-color: $nav-tabs-link-active-border-color;

    &:hover {
      background-color: $nav-tabs-link-active-bg; // added for bootstrap-rn
      border-color: $nav-tabs-link-active-border-color; // added for bootstrap-rn
    }
    &:focus {
      background-color: $nav-tabs-link-active-bg; // added for bootstrap-rn
      border-color: $nav-tabs-link-active-border-color; // added for bootstrap-rn
    }
  `,
  '.nav-tabs .nav-link.active --text': css`
    color: $nav-tabs-link-active-color;

    &:hover {
      color: $nav-tabs-link-active-color; // added for bootstrap-rn
    }
    &:focus {
      color: $nav-tabs-link-active-color; // added for bootstrap-rn
    }
  `,
  '.nav-pills .nav-link': css`
    background: transparent; // none;
    border: 0;
    border-radius: $nav-pills-border-radius;
  `,
  '.nav-pills .nav-link.active': css`
    // @include gradient-bg($nav-pills-link-active-bg);
    background-color: $nav-pills-link-active-bg; // added for bootstrap-rn

    &:hover {
      background-color: $nav-pills-link-active-bg; // added for bootstrap-rn
    }
    &:focus {
      background-color: $nav-pills-link-active-bg; // added for bootstrap-rn
    }
  `,
  '.nav-pills .nav-link.active --text': css`
    color: $nav-pills-link-active-color;

    &:hover {
      color: $nav-pills-link-active-color; // added for bootstrap-rn
    }
    &:focus {
      color: $nav-pills-link-active-color; // added for bootstyl
    }
  `,
  // Navbar styles
  '.navbar-nav .nav-link': css`
    padding-right: 0;
    padding-left: 0;
  `,
  ...each(GRID_BREAKPOINTS, (breakpoint) => ({
    [`.navbar-expand${infix(next(breakpoint))} .navbar-nav .nav-link`]: css`
      @include media-breakpoint-up(${next(breakpoint)}) {
        padding-right: $navbar-nav-link-padding-x;
        padding-left: $navbar-nav-link-padding-x;
      }
    `,
  })),
  '.navbar-light .navbar-nav .nav-link --text': css`
    color: $navbar-light-color;

    &:hover {
      color: $navbar-light-hover-color;
    }
    &:focus {
      color: $navbar-light-hover-color;
    }
  `,
  '.navbar-light .navbar-nav .nav-link.disabled --text': css`
    color: $navbar-light-disabled-color;
  `,
  '.navbar-light .navbar-nav .nav-link.active --text': css`
    color: $navbar-light-active-color;

    &:hover {
      color: $navbar-light-active-color; // added for bootstrap-rn
    }
    &:focus {
      color: $navbar-light-active-color; // added for bootstrap-rn
    }
  `,
  '.navbar-dark .navbar-nav .nav-link --text': css`
    color: $navbar-dark-color;

    &:hover {
      color: $navbar-dark-hover-color;
    }
    &:focus {
      color: $navbar-dark-hover-color;
    }
  `,
  '.navbar-dark .navbar-nav .nav-link.disabled --text': css`
    color: $navbar-dark-disabled-color;
  `,
  '.navbar-dark .navbar-nav .nav-link.active --text': css`
    color: $navbar-dark-active-color;

    &:hover {
      color: $navbar-dark-active-color; // added for bootstrap-rn
    }
    &:focus {
      color: $navbar-dark-active-color; // added for bootstrap-rn
    }
  `,
});

const NavLink = React.forwardRef<ViewRef, NavLinkProps>((props, ref) => {
  const [modifierProps, modifierRef] = useModifier('useTabbable', props, ref);

  const {
    children,
    active,
    disabled,
    style,
    activeStyle,
    textStyle,
    activeTextStyle,
    ...elementProps
  } = modifierProps;

  const { variant } = useForcedContext(NavContext);
  const navbar = useContext(NavbarContext);

  const classes = getStyles(styles, [
    '.nav-link',
    disabled && '.nav-link.disabled',
    variant && `.nav-${variant} .nav-link`,
    variant === 'tabs' && disabled && '.nav-tabs .nav-link.disabled',
    // Navbar styles
    navbar && '.navbar-nav .nav-link',
    navbar &&
      navbar.expand &&
      `.navbar-expand${
        navbar.expand === true ? '' : `-${navbar.expand}`
      } .navbar-nav .nav-link`,
    navbar && `.navbar-${navbar.variant} .navbar-nav .nav-link`,
    navbar &&
      disabled &&
      `.navbar-${navbar.variant} .navbar-nav .nav-link.disabled`,
  ]);

  const activeClasses = getStyles(styles, [
    variant && `.nav-${variant} .nav-link.active`,
    // Navbar styles
    navbar && `.navbar-${navbar.variant} .navbar-nav .nav-link.active`,
  ]);

  const textClasses = getStyles(styles, [
    '.nav-link --text',
    disabled && '.nav-link.disabled --text',
    variant && `.nav-${variant} .nav-link --text`,
    variant === 'tabs' && disabled && '.nav-tabs .nav-link.disabled --text',
    // Navbar styles
    navbar && '.navbar-nav .nav-link --text',
    navbar &&
      navbar.expand &&
      `.navbar-expand${infix(navbar.expand)} .navbar-nav .nav-link --text`,
    navbar && `.navbar-${navbar.variant} .navbar-nav .nav-link --text`,
    navbar &&
      disabled &&
      `.navbar-${navbar.variant} .navbar-nav .nav-link.disabled --text`,
  ]);

  const activeTextClasses = getStyles(styles, [
    variant && `.nav-${variant} .nav-link.active --text`,
    // Navbar styles
    navbar && `.navbar-${navbar.variant} .navbar-nav .nav-link.active --text`,
  ]);

  return (
    <Pressable
      {...elementProps}
      ref={modifierRef}
      active={active}
      disabled={disabled}
      style={[...classes, style]}
      activeStyle={[...activeClasses, activeStyle]}
      textStyle={[...textClasses, textStyle]}
      activeTextStyle={[...activeTextClasses, activeTextStyle]}
    >
      {children}
    </Pressable>
  );
});

NavLink.displayName = 'NavLink';

export default NavLink;
