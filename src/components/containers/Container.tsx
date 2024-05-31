import React, { useContext } from 'react';
import type { View as BaseView } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { CONTAINER_MAX_WIDTHS, GRID_BREAKPOINTS } from '../../theme/proxies';
import { getStyles, each } from '../../utils';
import { infix, next } from '../../theme/breakpoints';
import NavbarContext from '../navbar/NavbarContext';
import { ThemeVariables, ContainerMaxWidths } from '../../theme/types';

export type ContainerProps = {
  children: React.ReactNode;
  fluid: true | keyof typeof CONTAINER_MAX_WIDTHS;
  style: React.CSSProperties;
};

const styles = StyleSheet.create({
  '.container': css`
    width: 100%;
    padding-right: $container-padding-x;
    padding-left: $container-padding-x;
    margin-right: auto;
    margin-left: auto;
  `,
  '.container-sm': css`
    @include media-breakpoint-up(sm) {
      max-width: ${(t: ThemeVariables) =>
        (t['container-max-widths'] as ContainerMaxWidths).sm};
    }
    @include media-breakpoint-up(md) {
      max-width: ${(t: ThemeVariables) =>
        (t['container-max-widths'] as ContainerMaxWidths).md};
    }
    @include media-breakpoint-up(lg) {
      max-width: ${(t: ThemeVariables) =>
        (t['container-max-widths'] as ContainerMaxWidths).lg};
    }
    @include media-breakpoint-up(xl) {
      max-width: ${(t: ThemeVariables) =>
        (t['container-max-widths'] as ContainerMaxWidths).xl};
    }
    @include media-breakpoint-up(xxl) {
      max-width: ${(t: ThemeVariables) =>
        (t['container-max-widths'] as ContainerMaxWidths).xxl};
    }
  `,
  '.container-md': css`
    @include media-breakpoint-up(md) {
      max-width: ${(t: ThemeVariables) =>
        (t['container-max-widths'] as ContainerMaxWidths).md};
    }
    @include media-breakpoint-up(lg) {
      max-width: ${(t: ThemeVariables) =>
        (t['container-max-widths'] as ContainerMaxWidths).lg};
    }
    @include media-breakpoint-up(xl) {
      max-width: ${(t: ThemeVariables) =>
        (t['container-max-widths'] as ContainerMaxWidths).xl};
    }
    @include media-breakpoint-up(xxl) {
      max-width: ${(t: ThemeVariables) =>
        (t['container-max-widths'] as ContainerMaxWidths).xxl};
    }
  `,
  '.container-lg': css`
    @include media-breakpoint-up(lg) {
      max-width: ${(t: ThemeVariables) =>
        (t['container-max-widths'] as ContainerMaxWidths).lg};
    }
    @include media-breakpoint-up(xl) {
      max-width: ${(t: ThemeVariables) =>
        (t['container-max-widths'] as ContainerMaxWidths).xl};
    }
    @include media-breakpoint-up(xxl) {
      max-width: ${(t: ThemeVariables) =>
        (t['container-max-widths'] as ContainerMaxWidths).xxl};
    }
  `,
  '.container-xl': css`
    @include media-breakpoint-up(xl) {
      max-width: ${(t: ThemeVariables) =>
        (t['container-max-widths'] as ContainerMaxWidths).xl};
    }
    @include media-breakpoint-up(xxl) {
      max-width: ${(t: ThemeVariables) =>
        (t['container-max-widths'] as ContainerMaxWidths).xxl};
    }
  `,
  '.container-xxl': css`
    @include media-breakpoint-up(xxl) {
      max-width: ${(t: ThemeVariables) =>
        (t['container-max-widths'] as ContainerMaxWidths).xxl};
    }
  `,
  // Navbar styles
  '.navbar .container': css`
    display: flex;
    flex-direction: row; // added for bootstrap-rn
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  `,
  ...each(GRID_BREAKPOINTS, (breakpoint: keyof typeof GRID_BREAKPOINTS) => ({
    [`.navbar-expand${infix(next(breakpoint))} .container`]: css`
      @include media-breakpoint-up(${next(breakpoint)}) {
        flex-wrap: nowrap;
      }
    `,
  })),
});

const Container = React.forwardRef<BaseView, ContainerProps>((props, ref) => {
  const { fluid = 'sm', style, ...elementProps } = props;

  const navbar = useContext(NavbarContext);

  const classes = getStyles(styles, [
    '.container',
    // Hint: Bootstrap's .container class is identical with .container-sm.
    fluid !== true && `.container-${String(fluid)}`,
    // Navbar styles
    navbar && '.navbar .container',
    navbar &&
      navbar.expand &&
      `.navbar-expand${
        navbar.expand === true ? '' : `-${navbar.expand}`
      } .container`,
  ]);

  return <View {...elementProps} ref={ref} style={[classes, style]} />;
});

Container.displayName = 'Container';

export default Container;
