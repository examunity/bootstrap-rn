import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Link from '../type/Link';
import { GRID_BREAKPOINTS } from '../../theme/proxies';
import { infix, next } from '../../theme/breakpoints';
import { getStyles, each, optional } from '../../utils';
import useAction from '../../hooks/useAction';
import useForcedContext from '../../hooks/useForcedContext';
import NavbarContext from '../navbar/NavbarContext';
import NavContext from './NavContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.nav-link': css`
    // display: block;
    padding: $nav-link-padding-y $nav-link-padding-x;
    font-size: $nav-link-font-size;
    font-weight: $nav-link-font-weight;
    color: $nav-link-color;
    text-decoration: none; // if($link-decoration == none, null, none);
    // @include transition($nav-link-transition);

    &:hover {
      color: $nav-link-hover-color;
      text-decoration: none; // if($link-hover-decoration == underline, none, null);
    }
    &:focus {
      color: $nav-link-hover-color;
      text-decoration: none; // if($link-hover-decoration == underline, none, null);
    }
  `,
  '.nav-link-disabled': css`
    color: $nav-link-disabled-color;
    @include platform(web) {
      pointer-events: none;
      cursor: default;
    }
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
  '.nav-tabs .nav-link-disabled': css`
    color: $nav-link-disabled-color;
    background-color: transparent;
    border-color: transparent;
  `,
  '.nav-tabs .nav-link-active': css`
    color: $nav-tabs-link-active-color;
    background-color: $nav-tabs-link-active-bg;
    border-color: $nav-tabs-link-active-border-color;

    &:hover {
      color: $nav-tabs-link-active-color; // added for bootstyle
      background-color: $nav-tabs-link-active-bg; // added for bootstyle
      border-color: $nav-tabs-link-active-border-color; // added for bootstyle
    }
    &:focus {
      color: $nav-tabs-link-active-color; // added for bootstyle
      background-color: $nav-tabs-link-active-bg; // added for bootstyle
      border-color: $nav-tabs-link-active-border-color; // added for bootstyle
    }
  `,
  '.nav-pills .nav-link': css`
    background: transparent; // none;
    border: 0;
    border-radius: $nav-pills-border-radius;
  `,
  '.nav-pills .nav-link-active': css`
    color: $nav-pills-link-active-color;
    // @include gradient-bg($nav-pills-link-active-bg);
    background-color: $nav-pills-link-active-bg; // added for bootstyle

    &:hover {
      color: $nav-pills-link-active-color; // added for bootstyle
      background-color: $nav-pills-link-active-bg; // added for bootstyle
    }
    &:focus {
      color: $nav-pills-link-active-color; // added for bootstyle
      background-color: $nav-pills-link-active-bg; // added for bootstyle
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
  '.navbar-light .navbar-nav .nav-link': css`
    color: $navbar-light-color;

    &:hover {
      color: $navbar-light-hover-color;
    }
    &:focus {
      color: $navbar-light-hover-color;
    }
  `,
  '.navbar-light .navbar-nav .nav-link-disabled': css`
    color: $navbar-light-disabled-color;
  `,
  '.navbar-light .navbar-nav .nav-link-active': css`
    color: $navbar-light-active-color;

    &:hover {
      color: $navbar-light-active-color; // added for bootstyle
    }
    &:focus {
      color: $navbar-light-active-color; // added for bootstyle
    }
  `,
  '.navbar-dark .navbar-nav .nav-link': css`
    color: $navbar-dark-color;

    &:hover {
      color: $navbar-dark-hover-color;
    }
    &:focus {
      color: $navbar-dark-hover-color;
    }
  `,
  '.navbar-dark .navbar-nav .nav-link-disabled': css`
    color: $navbar-dark-disabled-color;
  `,
  '.navbar-dark .navbar-nav .nav-link-active': css`
    color: $navbar-dark-active-color;

    &:hover {
      color: $navbar-dark-active-color; // added for bootstyle
    }
    &:focus {
      color: $navbar-dark-active-color; // added for bootstyle
    }
  `,
});

const NavLink = React.forwardRef((props, ref) => {
  const [actionProps, actionRef] = useAction(props, ref);

  const { children, active, disabled, style, ...elementProps } = actionProps;

  const { variant } = useForcedContext(NavContext);
  const navbar = useContext(NavbarContext);

  const classes = getStyles(styles, [
    '.nav-link',
    disabled && '.nav-link-disabled',
    variant && `.nav-${variant} .nav-link`,
    variant === 'tabs' && disabled && '.nav-tabs .nav-link-disabled',
    variant && active && `.nav-${variant} .nav-link-active`,
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
      `.navbar-${navbar.variant} .navbar-nav .nav-link-disabled`,
    navbar &&
      active &&
      `.navbar-${navbar.variant} .navbar-nav .nav-link-active`,
  ]);

  return (
    <Link
      {...elementProps}
      ref={actionRef}
      {...optional(active, { accessibilityCurrent: true })}
      disabled={disabled}
      style={[classes, style]}
    >
      {children}
    </Link>
  );
});

NavLink.displayName = 'NavLink';
NavLink.propTypes = propTypes;

export default NavLink;
