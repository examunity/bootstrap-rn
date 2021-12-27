// Bootstrap Button
import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import TextStyleProvider from '../../style/TextStyleProvider';
import Pressable from '../Pressable';
import { getStyles, each } from '../../utils';
import { THEME_COLORS } from '../../theme/constants';
import { colorContrast } from '../../theme/functions';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([...Object.keys(THEME_COLORS), 'link']),
  size: PropTypes.oneOf(['lg', 'sm']),
  outline: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.btn': css`
    display: inline-block;
    // cursor: if($enable-button-pointers, pointer, null);
    // user-select: none;
    background-color: transparent;
    border: $btn-border-width solid transparent;
    padding: $btn-padding-y $btn-padding-x;
    // Manually declare to provide an override to the browser default
    border-radius: $btn-border-radius;
    // @include transition($btn-transition);

    &:hover {
      color: $body-color;
      text-decoration: $link-hover-decoration;
    }

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

    /* &:disabled {
      pointer-events: none;
      opacity: $btn-disabled-opacity;
      @include box-shadow(none);
    } */
  `,
  '.btn-text': css`
    font-family: $btn-font-family;
    font-weight: $btn-font-weight;
    line-height: $btn-font-size * $btn-line-height;
    color: $body-color;
    text-align: center;
    text-decoration: $link-decoration;
    white-space: $btn-white-space;
    // vertical-align: middle;
    font-size: $btn-font-size;
  `,
  ...each(THEME_COLORS, (color, value) => ({
    [`.btn-${color}`]: css`
      background-color: ${value};
      border-color: ${value};
      // @include box-shadow($btn-box-shadow);

      &:hover {
        background-color: ${value};
        border-color: ${value};
      }

      &:focus {
        background-color: ${value};
        border-color: ${value};
        /* @if $enable-shadows {
          @include box-shadow($btn-box-shadow, 0 0 0 $btn-focus-width rgba(mix($color, $border, 15%), .5));
        } @else {
          // Avoid using mixin so we can pass custom focus shadow properly
          box-shadow: 0 0 0 $btn-focus-width rgba(mix($color, $border, 15%), .5);
        } */
      }

      &:active {
        background-color: ${value};
        // Remove CSS gradients if they're enabled
        // background-image: if($enable-gradients, none, null);
        border-color: ${value};

        /* &:focus {
          @if $enable-shadows {
            @include box-shadow($btn-active-box-shadow, 0 0 0 $btn-focus-width rgba(mix($color, $border, 15%), .5));
          } @else {
            // Avoid using mixin so we can pass custom focus shadow properly
            box-shadow: 0 0 0 $btn-focus-width rgba(mix($color, $border, 15%), .5);
          }
        } */
      }

      /* &:disabled {
        color: $disabled-color;
        background-color: $disabled-background;
        // Remove CSS gradients if they're enabled
        background-image: if($enable-gradients, none, null);
        border-color: $disabled-border;
      } */
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

      /* &:disabled {
        color: $color;
        background-color: transparent;
      } */
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

    /* &:disabled {
      color: $btn-link-disabled-color;
    } */

    // No need for an active state here
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

const Button = React.forwardRef((props, ref) => {
  const {
    children,
    color = 'primary',
    size,
    outline = false,
    style,
    ...elementProps
  } = props;

  const classes = getStyles(styles, [
    '.btn',
    // A link button does not have a base class, only a text class.
    color !== 'link' && (outline ? `.btn-outline-${color}` : `.btn-${color}`),
    size === 'lg' && '.btn-lg',
    size === 'sm' && '.btn-sm',
  ]);

  const textClasses = getStyles(styles, [
    '.btn-text',
    outline ? `.btn-outline-${color}-text` : `.btn-${color}-text`,
    size === 'lg' && '.btn-lg-text',
    size === 'sm' && '.btn-sm-text',
  ]);

  return (
    <Pressable {...elementProps} ref={ref} style={[classes, style]}>
      <TextStyleProvider style={textClasses}>{children}</TextStyleProvider>
    </Pressable>
  );
});

Button.displayName = 'Button';
Button.propTypes = propTypes;

export default Button;
