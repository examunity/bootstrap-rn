import React, { useContext } from 'react';
import invariant from 'tiny-invariant';
import Pressable, { PressableProps } from '../Pressable';
import { THEME_COLORS } from '../../theme/proxies';
import { shadeColor, colorContrast } from '../../theme/functions';
import ButtonGroupContext, {
  ButtonGroupContextType,
} from '../button-group/ButtonGroupContext';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles, each } from '../../utils';
import useToggleButton from './useToggleButton';
import ListContext from '../helpers/ListContext';
import type { ThemeVariables } from '../../types';
import { ViewRef } from '../View';

type ButtonThemeColors = keyof typeof THEME_COLORS | 'link';

export interface ButtonProps extends PressableProps {
  color: ButtonThemeColors;
  size?: 'lg' | 'sm';
  outline?: boolean;
  active?: boolean;
  disabled?: boolean;
}

const styles = StyleSheet.create({
  '.btn': css`
    flex-direction: row; // added for bootstrap-rn
    justify-content: center; // added for bootstrap-rn
    // display: inline-block;
    @include platform(web) {
      // cursor: if($enable-button-pointers, pointer, null);
    }
    user-select: none;
    background-color: transparent;
    border: $btn-border-width solid transparent;
    padding: $btn-padding-y $btn-padding-x;
    // Manually declare to provide an override to the browser default
    border-radius: $btn-border-radius;
    // @include transition($btn-transition);

    &:focus-visible {
      // outline: 0;
      // box-shadow: $btn-focus-box-shadow;
    }

    &:active {
      // @include box-shadow($btn-active-box-shadow);

      &:focus-visible {
        // @include box-shadow($btn-focus-box-shadow, $btn-active-box-shadow);
      }
    }
  `,
  '.btn --text': css`
    font-family: $btn-font-family;
    font-weight: $btn-font-weight;
    line-height: $btn-font-size * $btn-line-height;
    color: $body-color;
    text-align: center;
    text-decoration: none; // if($link-decoration == none, null, none);
    white-space: $btn-white-space;
    vertical-align: middle;
    font-size: $btn-font-size;

    &:hover {
      color: $body-color;
      text-decoration: none; // if($link-decoration == none, null, none);
    }
  `,
  '.btn.disabled': css`
    pointer-events: none;
    opacity: $btn-disabled-opacity;
    // @include box-shadow(none);
  `,
  ...each(THEME_COLORS, (color, value) => ({
    [`.btn-${color}`]: css`
      background-color: ${value};
      border-color: ${value};
      // @include box-shadow($btn-box-shadow);

      &:hover {
        background-color: ${shadeColor(
          value,
          (t: ThemeVariables) => t['btn-hover-bg-shade-amount'],
        )};
        border-color: ${shadeColor(
          value,
          (t: ThemeVariables) => t['btn-hover-border-shade-amount'],
        )};
      }

      &:focus-visible {
        background-color: ${shadeColor(
          value,
          (t: ThemeVariables) => t['btn-hover-bg-shade-amount'],
        )};
        border-color: ${shadeColor(
          value,
          (t: ThemeVariables) => t['btn-hover-border-shade-amount'],
        )};
        /* @if $enable-shadows {
          @include box-shadow($btn-box-shadow, 0 0 0 $btn-focus-width rgba(mix($color, $border, 15%), .5));
        } @else {
          // Avoid using mixin so we can pass custom focus shadow properly
          box-shadow: 0 0 0 $btn-focus-width rgba(mix($color, $border, 15%), .5);
        } */
      }

      &:active {
        background-color: ${shadeColor(
          value,
          (t: ThemeVariables) => t['btn-active-bg-shade-amount'],
        )};
        // Remove CSS gradients if they're enabled
        // background-image: if($enable-gradients, none, null);
        border-color: ${shadeColor(
          value,
          (t: ThemeVariables) => t['btn-active-border-shade-amount'],
        )};
      }
    `,
    [`.btn-${color} --text`]: css`
      color: ${colorContrast(value)};

      &:hover {
        color: ${colorContrast(value)};
      }

      &:focus-visible {
        color: ${colorContrast(value)};
      }

      &:active {
        color: ${colorContrast(value)};
      }
    `,
    [`.btn-${color}.active`]: css`
      background-color: ${shadeColor(
        value,
        (t: ThemeVariables) => t['btn-active-bg-shade-amount'],
      )};
      // Remove CSS gradients if they're enabled
      // background-image: if($enable-gradients, none, null);
      border-color: ${shadeColor(
        value,
        (t: ThemeVariables) => t['btn-active-border-shade-amount'],
      )};
    `,
    [`.btn-${color}.active --text`]: css`
      color: ${colorContrast(value)};
    `,
    [`.btn-${color}.disabled`]: css`
      $disabled-background: ${value};
      $disabled-border: ${value};

      background-color: $disabled-background;
      // Remove CSS gradients if they're enabled
      // background-image: if($enable-gradients, none, null);
      border-color: $disabled-border;
    `,
    [`.btn-${color}.disabled --text`]: css`
      $disabled-color: ${colorContrast(value)};

      color: $disabled-color;
    `,
    [`.btn-outline-${color}`]: css`
      border-color: ${value};

      &:hover {
        background-color: ${value};
        border-color: ${value};
      }

      &:focus-visible {
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
    [`.btn-outline-${color} --text`]: css`
      color: ${value};

      &:hover {
        color: ${colorContrast(value)};
      }

      &:active {
        color: ${colorContrast(value)};
      }
    `,
    [`.btn-outline-${color}.disabled`]: css`
      background-color: transparent;
    `,
    [`.btn-outline-${color}.disabled --text`]: css`
      color: ${value};
    `,
  })),
  '.btn-link --text': css`
    font-weight: $font-weight-normal;
    color: $btn-link-color;
    text-decoration-color: $btn-link-color; // added for bootstrap-rn
    text-decoration-line: $link-decoration;

    &:hover {
      color: $btn-link-hover-color;
      text-decoration-color: $btn-link-hover-color; // added for bootstrap-rn
      text-decoration-line: $link-hover-decoration;
    }

    &:focus-visible {
      text-decoration-line: $link-hover-decoration;
    }

    // No need for an active state here
  `,
  '.btn-link.disabled --text': css`
    color: $btn-link-disabled-color;
  `,
  '.btn-lg': css`
    padding: $btn-padding-y-lg $btn-padding-x-lg;
    // Manually declare to provide an override to the browser default
    border-radius: $btn-border-radius-lg;
  `,
  '.btn-lg --text': css`
    line-height: $btn-font-size-lg * $btn-line-height;
    font-size: $btn-font-size-lg;
  `,
  '.btn-sm': css`
    padding: $btn-padding-y-sm $btn-padding-x-sm;
    // Manually declare to provide an override to the browser default
    border-radius: $btn-border-radius-sm;
  `,
  '.btn-sm --text': css`
    line-height: $btn-font-size-sm * $btn-line-height;
    font-size: $btn-font-size-sm;
  `,
  '.btn-group > .btn': css`
    position: relative;
    // flex: 1 1 auto;

    &:hover {
      z-index: 1;
    }
    &:focus-visible {
      z-index: 1;
    }
    &:active {
      z-index: 1;
    }
  `,
  '.btn-group > .btn.active': css`
    z-index: 2; // 1;
  `,
  '.btn-group > .btn:not(:first-child)': css`
    margin-left: -$btn-border-width;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  `,
  '.btn-group > .btn:not(:last-child)': css`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  `,
});

const getVariant = (color: ButtonThemeColors, outline?: boolean) => {
  if (color === 'link') {
    return null;
  }

  if (outline) {
    return `.btn-outline-${color}`;
  }

  return `.btn-${color}`;
};

const hasSize = (
  value: string,
  group: ButtonGroupContextType | null,
  size?: string,
) => {
  if (size !== undefined || !group) {
    return size === value;
  }

  return group.size === value;
};

const Button = React.forwardRef<ViewRef, ButtonProps>((props, ref) => {
  const {
    children,
    color = 'primary',
    size,
    outline = false,
    active = false,
    disabled = false,
    style,
    activeStyle,
    textStyle,
    activeTextStyle,
    ...elementProps
  } = props;

  invariant(
    color !== 'link' || !outline,
    'Button link variant is only available as non outline style.',
  );

  const listItem = useContext(ListContext);
  const group = useContext(ButtonGroupContext);

  const classes = getStyles(styles, [
    '.btn',
    getVariant(color, outline),
    disabled && '.btn.disabled',
    disabled && `${getVariant(color, outline)}.disabled`,
    hasSize('lg', group, size) && '.btn-lg',
    hasSize('sm', group, size) && '.btn-sm',
    group && '.btn-group > .btn',
    group && active && '.btn-group > .btn.active',
    group && !listItem?.first && '.btn-group > .btn:not(:first-child)',
    group && !listItem?.last && '.btn-group > .btn:not(:last-child)',
  ]);

  const activeClasses = getStyles(styles, [
    `${getVariant(color, outline)}.active`,
  ]);

  const textClasses = getStyles(styles, [
    '.btn --text',
    `${getVariant(color, outline)} --text`,
    color === 'link' && '.btn-link --text',
    disabled && `${getVariant(color, outline)}.disabled --text`,
    disabled && color === 'link' && '.btn-link.disabled --text',
    hasSize('lg', group, size) && '.btn-lg --text',
    hasSize('sm', group, size) && '.btn-sm --text',
  ]);

  const activeTextClasses = getStyles(styles, [
    `${getVariant(color, outline)}.active --text`,
  ]);

  return (
    <Pressable
      {...elementProps}
      ref={ref}
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

Button.displayName = 'Button';

export default Object.assign(Button, {
  useToggle: useToggleButton,
});
