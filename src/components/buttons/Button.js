// Bootstrap Button
import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import TextStyleProvider from '../../style/TextStyleProvider';
import Pressable from '../Pressable';
import { getStyles, each } from '../../utils';
import { THEME_COLORS } from '../../theme/constants';
import { shadeColor, colorContrast } from '../../theme/functions';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([...Object.keys(THEME_COLORS), 'link']),
  size: PropTypes.oneOf(['lg', 'sm']),
  outline: PropTypes.bool,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.btn': css`
    // display: inline-block;
    // cursor: if($enable-button-pointers, pointer, null);
    // user-select: none;
    background-color: transparent;
    border: $btn-border-width solid transparent;
    padding: $btn-padding-y $btn-padding-x;
    // Manually declare to provide an override to the browser default
    border-radius: $btn-border-radius;
    // @include transition($btn-transition);

    &:focus {
      // outline: 0;
      // box-shadow: $btn-focus-box-shadow;
    }

    &:active {
      // @include box-shadow($btn-active-box-shadow);

      &:focus {
        // @include box-shadow($btn-focus-box-shadow, $btn-active-box-shadow);
      }
    }
  `,
  '.btn-text': css`
    font-family: $btn-font-family;
    font-weight: $btn-font-weight;
    line-height: $btn-font-size * $btn-line-height;
    color: $body-color;
    text-align: center;
    text-decoration: none; // if($link-decoration == none, null, none);
    white-space: $btn-white-space;
    // vertical-align: middle;
    font-size: $btn-font-size;

    &:hover {
      color: $body-color;
      text-decoration: $link-hover-decoration;
    }
  `,
  '.btn-disabled': css`
    // pointer-events: none;
    opacity: $btn-disabled-opacity;
    // @include box-shadow(none);
  `,
  ...each(THEME_COLORS, (color, value) => ({
    [`.btn-${color}`]: css`
      background-color: ${value};
      border-color: ${value};
      // @include box-shadow($btn-box-shadow);

      &:hover {
        background-color: ${(t) =>
          shadeColor(t['btn-hover-bg-shade-amount'], value(t))};
        border-color: ${(t) =>
          shadeColor(t['btn-hover-border-shade-amount'], value(t))};
      }

      &:focus {
        background-color: ${(t) =>
          shadeColor(t['btn-hover-bg-shade-amount'], value(t))};
        border-color: ${(t) =>
          shadeColor(t['btn-hover-border-shade-amount'], value(t))};
        /* @if $enable-shadows {
          @include box-shadow($btn-box-shadow, 0 0 0 $btn-focus-width rgba(mix($color, $border, 15%), .5));
        } @else {
          // Avoid using mixin so we can pass custom focus shadow properly
          box-shadow: 0 0 0 $btn-focus-width rgba(mix($color, $border, 15%), .5);
        } */
      }

      &:active {
        background-color: ${(t) =>
          shadeColor(t['btn-active-bg-shade-amount'], value(t))};
        // Remove CSS gradients if they're enabled
        // background-image: if($enable-gradients, none, null);
        border-color: ${(t) =>
          shadeColor(t['btn-active-border-shade-amount'], value(t))};

        /* &:focus {
          @if $enable-shadows {
            @include box-shadow($btn-active-box-shadow, 0 0 0 $btn-focus-width rgba(mix($color, $border, 15%), .5));
          } @else {
            // Avoid using mixin so we can pass custom focus shadow properly
            box-shadow: 0 0 0 $btn-focus-width rgba(mix($color, $border, 15%), .5);
          }
        } */
      }
    `,
    [`.btn-${color}-text`]: css`
      color: ${(t) => colorContrast(value(t))};

      &:hover {
        color: ${(t) => colorContrast(value(t))};
      }

      &:focus {
        color: ${(t) => colorContrast(value(t))};
      }

      &:active {
        color: ${(t) => colorContrast(value(t))};
      }
    `,
    [`.btn-${color}-disabled`]: css`
      $disabled-background: ${value};
      $disabled-border: ${value};

      background-color: $disabled-background;
      // Remove CSS gradients if they're enabled
      // background-image: if($enable-gradients, none, null);
      border-color: $disabled-border;
    `,
    [`.btn-${color}-disabled-text`]: css`
      $disabled-color: ${(t) => colorContrast(value(t))};

      color: $disabled-color;
    `,
    [`.btn-outline-${color}`]: css`
      border-color: ${value};

      &:hover {
        background-color: ${value};
        border-color: ${value};
      }

      &:focus {
        // box-shadow: 0 0 0 $btn-focus-width rgba($color, .5);
      }

      &:active {
        background-color: ${value};
        border-color: ${value};

        /* &:focus {
          @if $enable-shadows {
            @include box-shadow(
              $btn-active-box-shadow,
              0 0 0 $btn-focus-width rgba($color, 0.5)
            );
          } @else {
            // Avoid using mixin so we can pass custom focus shadow properly
            box-shadow: 0 0 0 $btn-focus-width rgba($color, 0.5);
          }
        } */
      }
    `,
    [`.btn-outline-${color}-text`]: css`
      color: ${value};

      &:hover {
        color: ${(t) => colorContrast(value(t))};
      }

      &:active {
        color: ${(t) => colorContrast(value(t))};
      }
    `,
    [`.btn-outline-${color}-disabled`]: css`
      background-color: transparent;
    `,
    [`.btn-outline-${color}-disabled-text`]: css`
      color: ${value};
    `,
  })),
  '.btn-link-text': css`
    font-weight: $font-weight-normal;
    color: $btn-link-color;
    text-decoration: $link-decoration;

    &:hover {
      color: $btn-link-hover-color;
      text-decoration: $link-hover-decoration;
    }

    &:focus {
      text-decoration: $link-hover-decoration;
    }

    // No need for an active state here
  `,
  '.btn-link-text-disabled': css`
    color: $btn-link-disabled-color;
  `,
  '.btn-lg': css`
    padding: $btn-padding-y-lg $btn-padding-x-lg;
    // Manually declare to provide an override to the browser default
    border-radius: $btn-border-radius-lg;
  `,
  '.btn-lg-text': css`
    line-height: $btn-font-size-lg * $btn-line-height;
    font-size: $btn-font-size-lg;
  `,
  '.btn-sm': css`
    padding: $btn-padding-y-sm $btn-padding-x-sm;
    // Manually declare to provide an override to the browser default
    border-radius: $btn-border-radius-sm;
  `,
  '.btn-sm-text': css`
    line-height: $btn-font-size-sm * $btn-line-height;
    font-size: $btn-font-size-sm;
  `,
});

const getVariant = (color, outline) => {
  if (color === 'link') {
    return null;
  }

  if (outline) {
    return `.btn-outline-${color}`;
  }

  return `.btn-${color}`;
};

const Button = React.forwardRef((props, ref) => {
  const {
    children,
    color = 'primary',
    size,
    outline = false,
    disabled = false,
    style,
    ...elementProps
  } = props;

  invariant(
    color !== 'link' || !outline,
    'Button link variant is only available as non outline style.',
  );

  const classes = getStyles(styles, [
    '.btn',
    getVariant(color, outline),
    disabled && '.btn-disabled',
    disabled && `${getVariant(color, outline)}-disabled`,
    size === 'lg' && '.btn-lg',
    size === 'sm' && '.btn-sm',
  ]);

  const textClasses = getStyles(styles, [
    '.btn-text',
    `${getVariant(color, outline)}-text`,
    color === 'link' && '.btn-link-text',
    disabled && `${getVariant(color, outline)}-text-disabled`,
    disabled && color === 'link' && '.btn-link-text-disabled',
    size === 'lg' && '.btn-lg-text',
    size === 'sm' && '.btn-sm-text',
  ]);

  return (
    <Pressable {...elementProps} ref={ref} style={[...classes, style]}>
      <TextStyleProvider style={textClasses}>{children}</TextStyleProvider>
    </Pressable>
  );
});

Button.displayName = 'Button';
Button.propTypes = propTypes;

export default Button;
