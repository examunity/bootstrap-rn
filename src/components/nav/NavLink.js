import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Link from '../type/Link';
import { getStyles } from '../../utils';

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
  '.nav-link-active': css`
    color: $nav-tabs-link-active-color;
    background-color: $nav-tabs-link-active-bg;
    border-color: $nav-tabs-link-active-border-color;
  `,
});

const NavLink = React.forwardRef((props, ref) => {
  const { children, active, disabled, style, ...elementProps } = props;

  const classes = getStyles(styles, [
    '.nav-link',
    active && '.nav-link-active',
    disabled && '.nav-link-disabled',
  ]);

  return (
    <Link {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </Link>
  );
});

NavLink.displayName = 'NavLink';
NavLink.propTypes = propTypes;

export default NavLink;
