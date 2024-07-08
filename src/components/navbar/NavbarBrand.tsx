import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Pressable, { PressableProps, PressableRef } from '../Pressable';
import useForcedContext from '../../hooks/useForcedContext';
import { getStyles } from '../../utils';
import NavbarContext from './NavbarContext';

export interface NavbarBrand extends PressableProps {}

const styles = StyleSheet.create({
  '.navbar-brand': css`
    padding-top: $navbar-brand-padding-y;
    padding-bottom: $navbar-brand-padding-y;
    margin-right: $navbar-brand-margin-end;
  `,
  '.navbar-brand --text': css`
    font-size: $navbar-brand-font-size;
    line-height: $navbar-brand-font-size * $line-height-base; // added for bootstrap-rn
    text-decoration: none; // if($link-decoration == none, null, none);
    // white-space: nowrap;

    &:hover {
      text-decoration: none; // if($link-hover-decoration == underline, none, null);
    }
    &:focus {
      text-decoration: none; // if($link-hover-decoration == underline, none, null);
    }
  `,
  '.navbar-light .navbar-brand --text': css`
    color: $navbar-light-brand-color;

    &:hover {
      color: $navbar-light-brand-hover-color;
    }
    &:focus {
      color: $navbar-light-brand-hover-color;
    }
  `,
  '.navbar-dark .navbar-brand --text': css`
    color: $navbar-dark-brand-color;

    &:hover {
      color: $navbar-dark-brand-hover-color;
    }
    &:focus {
      color: $navbar-dark-brand-hover-color;
    }
  `,
});

const NavbarBrand = React.forwardRef<PressableRef, NavbarBrand>(
  (props, ref) => {
    const { children, style, textStyle, ...elementProps } = props;

    const { variant } = useForcedContext(NavbarContext);

    const classes = getStyles(styles, ['.navbar-brand']);

    const textClasses = getStyles(styles, [
      '.navbar-brand --text',
      `.navbar-${variant} .navbar-brand --text`,
    ]);

    return (
      <Pressable
        {...elementProps}
        ref={ref}
        style={[classes, style]}
        textStyle={[textClasses, textStyle]}
      >
        {children}
      </Pressable>
    );
  },
);

NavbarBrand.displayName = 'NavbarBrand';

export default NavbarBrand;
