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
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.form-control': css`
    // display: block;
    width: 100%;
    padding: $input-padding-y $input-padding-x;
    font-family: $input-font-family;
    font-size: $input-font-size;
    font-weight: $input-font-weight;
    line-height: $input-font-size * $input-line-height;
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
      }
      /* @if $enable-shadows {
        @include box-shadow($input-box-shadow, $input-focus-box-shadow);
      } @else {
        // Avoid using mixin so we can pass custom focus shadow properly
        box-shadow: $input-focus-box-shadow;
      } */
    }
  `,
  '.form-control-disabled': css`
    background-color: $input-disabled-bg;
    border-color: $input-disabled-border-color;
    // iOS fix for unreadable disabled content; see https://github.com/twbs/bootstrap/issues/11655.
    opacity: 1;
  `,
  '.form-control-sm': css`
    min-height: $input-height-sm;
    padding: $input-padding-y-sm $input-padding-x-sm;
    font-size: $input-font-size-sm;
    border-radius: $input-border-radius-sm;
  `,
  '.form-control-lg': css`
    min-height: $input-height-lg;
    padding: $input-padding-y-lg $input-padding-x-lg;
    font-size: $input-font-size-lg;
    border-radius: $input-border-radius-lg;
  `,
  '.form-control-multiline': css`
    text-align-vertical: top; // added for bootstrap-rn
    min-height: $input-height;

    @include platform(ios) {
      min-height: $input-height-sm + 8rem; // added for bootstrap-rn
    }
  `,
  '.form-control-multiline-sm': css`
    min-height: $input-height-sm;

    @include platform(ios) {
      // TODO: Adjust ios height to sm size
      min-height: $input-height-sm + 8rem; // added for bootstrap-rn
    }
  `,
  '.form-control-multiline-lg': css`
    min-height: $input-height-lg;

    @include platform(ios) {
      // TODO: Adjust ios height to lg size
      min-height: $input-height-sm + 8rem; // added for bootstrap-rn
    }
  `,
  ...each(FORM_VALIDATION_STATES, (state, data) => ({
    [`.form-control.is-${state}`]: css`
      border-color: ${(t) => data(t).color};

      &:focus {
        border-color: ${(t) => data(t).color};
        // box-shadow: $focus-box-shadow;
      }
    `,
  })),
});

const Input = React.forwardRef((props, ref) => {
  const [modifierProps, modifierRef] = useModifier('useFormField', props, ref);

  const {
    size,
    placeholderTextColor,
    multiline = false,
    disabled = false,
    valid = false,
    invalid = false,
    style,
    ...elementProps
  } = modifierProps;

  const classes = getStyles(styles, [
    '.form-control',
    disabled && '.form-control-disabled',
    size === 'sm' && '.form-control-sm',
    size === 'lg' && '.form-control-lg',
    multiline && '.form-control-multiline',
    multiline && size === 'sm' && '.form-control-multiline-sm',
    multiline && size === 'lg' && '.form-control-multiline-lg',
    valid && '.form-control.is-valid',
    invalid && '.form-control.is-invalid',
  ]);

  return (
    <TextInput
      {...elementProps}
      ref={modifierRef}
      placeholderTextColor={
        placeholderTextColor || StyleSheet.value('input-placeholder-color')
      }
      multiline={multiline}
      disabled={disabled}
      editable={!disabled}
      selectTextOnFocus={!disabled}
      style={[classes, style]}
    />
  );
});

Input.displayName = 'Input';
Input.propTypes = propTypes;

export default Input;
