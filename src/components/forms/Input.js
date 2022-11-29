import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import TextInput from '../TextInput';
import { getStyles, each } from '../../utils';
import useModifier from '../../hooks/useModifier';
import { FORM_VALIDATION_STATES } from '../../theme/proxies';

const propTypes = {
  size: PropTypes.oneOf(['sm', 'lg']),
  placeholderTextColor: PropTypes.string,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
  editable: PropTypes.bool,
  selectTextOnFocus: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

// Known issues:
//
// line-height (iOS)
// If a line height is defined on iOS the text will be displayed on the bottom
// of the line. As a workaround the line height is only defined for multi line
// inputs.
//
// multi line height (iOS)
// A multi line input on iOS has only the height of a single line input. As a
// workaround we added a height of $input-height-sm + 8rem for multi line
// inputs on iOS.
//
// single line height (Android)
// If no height is defined, Android sets a text line height of 28px auto-
// matically, which leads to a larger height than min height for the default
// and sm size. As a workaround we set a height for single line inputs.
const styles = StyleSheet.create({
  '.form-control': css`
    // display: block;
    width: 100%;
    min-height: $input-height; // added for bootstrap-rn
    padding: $input-padding-y $input-padding-x;
    font-family: $input-font-family;
    font-size: $input-font-size;
    font-weight: $input-font-weight;
    @include platform(web) {
      line-height: $input-font-size * $input-line-height;
    }
    color: $input-color;
    background-color: $input-bg;
    // background-clip: padding-box;
    border: $input-border-width solid $input-border-color;
    @include platform(web) {
      appearance: none; // Fix appearance for date inputs in Safari
    }

    // Note: This has no effect on <select>s in some browsers, due to the limited stylability of "<select>"s in CSS.
    border-radius: $input-border-radius;

    // @include box-shadow($input-box-shadow);
    // @include transition($input-transition);

    // Customize the ":focus" state to imitate native WebKit styles.
    &:focus {
      color: $input-focus-color;
      background-color: $input-focus-bg;
      border-color: $input-focus-border-color;
      @include platform(web) {
        outline-width: 0; // outline: 0;
        // @if $enable-shadows {
        //   @include box-shadow($input-box-shadow, $input-focus-box-shadow);
        // } @else {
        //   // Avoid using mixin so we can pass custom focus shadow properly
        box-shadow: $input-focus-box-shadow;
        // }
      }
    }
  `,
  '.form-control.disabled': css`
    background-color: $input-disabled-bg;
    border-color: $input-disabled-border-color;
    // iOS fix for unreadable disabled content; see https://github.com/twbs/bootstrap/issues/11655.
    opacity: 1;
  `,
  '.form-control-sm': css`
    min-height: $input-height-sm;
    padding: $input-padding-y-sm $input-padding-x-sm;
    font-size: $input-font-size-sm;
    @include platform(web) {
      line-height: $input-font-size-sm * $line-height-base; // added for bootstrap-rn
    }
    border-radius: $input-border-radius-sm;
  `,
  '.form-control-lg': css`
    min-height: $input-height-lg;
    padding: $input-padding-y-lg $input-padding-x-lg;
    font-size: $input-font-size-lg;
    @include platform(web) {
      line-height: $input-font-size-lg * $line-height-base; // added for bootstrap-rn
    }
    border-radius: $input-border-radius-lg;
  `,
  '.form-control:not(textarea)': css`
    @include platform(android) {
      height: $input-height; // added for bootstrap-rn
    }
  `,
  '.form-control-sm:not(textarea)': css`
    @include platform(android) {
      height: $input-height-sm; // added for bootstrap-rn
    }
  `,
  '.form-control-lg:not(textarea)': css`
    @include platform(android) {
      height: $input-height-lg; // added for bootstrap-rn
    }
  `,
  'textarea.form-control': css`
    text-align-vertical: top; // added for bootstrap-rn
    min-height: $input-height;

    @include platform(ios) {
      min-height: $input-height-sm + 8rem; // added for bootstrap-rn
    }
    @include platform(native) {
      line-height: $input-font-size * $input-line-height; // added for bootstrap-rn
    }
  `,
  'textarea.form-control-sm': css`
    min-height: $input-height-sm;

    @include platform(ios) {
      // TODO: Adjust ios height to sm size
      min-height: $input-height-sm + 8rem; // added for bootstrap-rn
    }
    @include platform(native) {
      line-height: $input-font-size-sm * $line-height-base; // added for bootstrap-rn
    }
  `,
  'textarea.form-control-lg': css`
    min-height: $input-height-lg;

    @include platform(ios) {
      // TODO: Adjust ios height to lg size
      min-height: $input-height-sm + 8rem; // added for bootstrap-rn
    }
    @include platform(native) {
      line-height: $input-font-size-sm * $line-height-base; // added for bootstrap-rn
    }
  `,
  ...each(FORM_VALIDATION_STATES, (state, data) => ({
    [`.form-control:${state}`]: css`
      border-color: ${(t) => data(t).color};

      &:focus {
        border-color: ${(t) => data(t).color};
        @include platform(web) {
          box-shadow: 0 0 $input-btn-focus-blur $input-focus-width
            rgba(${(t) => data(t).color}, $input-btn-focus-color-opacity);
        }
      }
    `,
  })),
});

const Input = React.forwardRef((props, ref) => {
  const [modifierProps, modifierRef] = useModifier('useFormField', props, ref);

  const {
    size,
    placeholderTextColor = StyleSheet.value('input-placeholder-color'),
    multiline = false,
    disabled = false,
    valid = false,
    invalid = false,
    editable = true,
    selectTextOnFocus = false,
    style,
    ...elementProps
  } = modifierProps;

  const classes = getStyles(styles, [
    '.form-control',
    disabled && '.form-control.disabled',
    size === 'sm' && '.form-control-sm',
    size === 'lg' && '.form-control-lg',
    !multiline && '.form-control:not(textarea)',
    !multiline && size === 'sm' && '.form-control-sm:not(textarea)',
    !multiline && size === 'lg' && '.form-control-lg:not(textarea)',
    multiline && 'textarea.form-control',
    multiline && size === 'sm' && 'textarea.form-control-sm',
    multiline && size === 'lg' && 'textarea.form-control-lg',
    valid && '.form-control:valid',
    invalid && '.form-control:invalid',
  ]);

  return (
    <TextInput
      {...elementProps}
      ref={modifierRef}
      placeholderTextColor={placeholderTextColor}
      multiline={multiline}
      disabled={disabled}
      editable={disabled ? false : editable}
      selectTextOnFocus={disabled ? false : selectTextOnFocus}
      style={[classes, style]}
    />
  );
});

Input.displayName = 'Input';
Input.propTypes = propTypes;

export default Input;
