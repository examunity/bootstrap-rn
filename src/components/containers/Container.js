import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { GRID_BREAKPOINT_KEYS } from '../../theme/constants';
import { getStyles } from '../../utils';

const FLUID_BREAKPOINTS = GRID_BREAKPOINT_KEYS.filter((v) => v !== 'xs');

const propTypes = {
  children: PropTypes.node.isRequired,
  fluid: PropTypes.oneOf([true, ...FLUID_BREAKPOINTS]),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  base: css`
    width: 100%;
    padding-right: $container-padding-x;
    padding-left: $container-padding-x;
    margin-right: auto;
    margin-left: auto;
  `,
  '.container-sm': css`
    @include media-breakpoint-up(sm) {
      max-width: ${(t) => t['container-max-widths'].sm};
    }
    @include media-breakpoint-up(md) {
      max-width: ${(t) => t['container-max-widths'].md};
    }
    @include media-breakpoint-up(lg) {
      max-width: ${(t) => t['container-max-widths'].lg};
    }
    @include media-breakpoint-up(xl) {
      max-width: ${(t) => t['container-max-widths'].xl};
    }
    @include media-breakpoint-up(xxl) {
      max-width: ${(t) => t['container-max-widths'].xxl};
    }
  `,
  '.container-md': css`
    @include media-breakpoint-up(md) {
      max-width: ${(t) => t['container-max-widths'].md};
    }
    @include media-breakpoint-up(lg) {
      max-width: ${(t) => t['container-max-widths'].lg};
    }
    @include media-breakpoint-up(xl) {
      max-width: ${(t) => t['container-max-widths'].xl};
    }
    @include media-breakpoint-up(xxl) {
      max-width: ${(t) => t['container-max-widths'].xxl};
    }
  `,
  '.container-lg': css`
    @include media-breakpoint-up(lg) {
      max-width: ${(t) => t['container-max-widths'].lg};
    }
    @include media-breakpoint-up(xl) {
      max-width: ${(t) => t['container-max-widths'].xl};
    }
    @include media-breakpoint-up(xxl) {
      max-width: ${(t) => t['container-max-widths'].xxl};
    }
  `,
  '.container-xl': css`
    @include media-breakpoint-up(xl) {
      max-width: ${(t) => t['container-max-widths'].xl};
    }
    @include media-breakpoint-up(xxl) {
      max-width: ${(t) => t['container-max-widths'].xxl};
    }
  `,
  '.container-xxl': css`
    @include media-breakpoint-up(xxl) {
      max-width: ${(t) => t['container-max-widths'].xxl};
    }
  `,
});

const Container = React.forwardRef((props, ref) => {
  const { fluid = 'sm', style, ...elementProps } = props;

  const classes = getStyles(styles, [
    'base',
    // Hint: Bootstrap's .container class is identical with .container-sm.
    fluid !== true && `.container-${fluid}`,
  ]);

  return <View {...elementProps} ref={ref} style={[classes, style]} />;
});

Container.displayName = 'Container';
Container.propTypes = propTypes;

export default Container;
