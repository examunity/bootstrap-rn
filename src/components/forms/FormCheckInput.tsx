import React, { useContext, useState } from 'react';
import { Platform } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles, each } from '../../utils';
import useMedia from '../../hooks/useMedia';
import useStyle from '../../hooks/useStyle';
import useModifier from '../../hooks/useModifier';
import { FORM_VALIDATION_STATES } from '../../theme/proxies';
import { escapeSvg } from '../../theme/functions';
import FormCheckContext from './FormCheckContext';
import FormCheckInputWeb from './internals/FormCheckInputWeb';
import FormCheckInputNative from './internals/FormCheckInputNative';
import { ThemeData, ThemeVariables } from '../../types';

export type FormCheckInputProps = {
  type: 'checkbox' | 'radio' | 'switch';
  value: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onValueChange?: (value?: boolean | number | string | object) => void;
  disabled?: boolean;
  valid?: boolean;
  invalid?: boolean;
  useNativeComponent?: boolean;
  style?: React.CSSProperties;
};
/* eslint-enable */

const styles = StyleSheet.create({
  '.form-check .form-check-input': css`
    $height: $line-height-base * 1rem;
    $margin-top-double: $height - $form-check-input-width;

    // float: left;
    // margin-left: $form-check-padding-start * -1;
    margin-top: $margin-top-double * 0.5; // added for bootstrap-rn
    margin-right: $form-check-padding-start - $form-check-input-width; // added for bootstrap-rn
  `,
  '.form-check-reverse .form-check-input': css`
    // float: right;
    // margin-right: $form-check-padding-start * -1;
    margin-right: 0; // added for bootstrap-rn
    // margin-left: 0;
    margin-left: $form-check-padding-start - $form-check-input-width; // added for bootstrap-rn
  `,
  '.form-check-input': css`
    width: $form-check-input-width;
    height: $form-check-input-width;
    // margin-top: ($line-height-base - $form-check-input-width) * 0.5; // line-height minus check height
    vertical-align: top;
    background-color: $form-check-input-bg;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: $form-check-input-border;
    @include platform(web) {
      appearance: none;
      user-select: none; // added for bootstrap-rn
      color-adjust: exact; // Keep themed appearance for print
    }
    // @include transition($form-check-transition);

    &:active {
      // filter: $form-check-input-active-filter;
    }

    &:focus {
      border-color: $form-check-input-focus-border;
      @include platform(web) {
        outline-width: 0; // outline: 0;
        box-shadow: $form-check-input-focus-box-shadow;
      }
    }
  `,
  '.form-check-input[type="checkbox"]': css`
    border-radius: $form-check-input-border-radius;
  `,
  '.form-check-input[type="radio"]': css`
    border-radius: $form-check-radio-border-radius;
  `,
  '.form-check-input:checked': css`
    background-color: $form-check-input-checked-bg-color;
    border-color: $form-check-input-checked-border-color;
  `,
  '.form-check-input[type="checkbox"]:checked': css`
    // @if $enable-gradients {
    //   background-image: escape-svg($form-check-input-checked-bg-image), var(--#{$variable-prefix}gradient);
    // } @else {
    background-image: ${(t: ThemeVariables) =>
      escapeSvg(t['form-check-input-checked-bg-image'])};
    // }
  `,
  '.form-check-input[type="radio"]:checked': css`
    // @if $enable-gradients {
    //   background-image: escape-svg($form-check-radio-checked-bg-image), var(--#{$variable-prefix}gradient);
    // } @else {
    background-image: ${(t: ThemeVariables) =>
      escapeSvg(t['form-check-radio-checked-bg-image'])};
    // }
  `,
  '.form-check-input:disabled': css`
    @include platform(web) {
      pointer-events: none;
      filter: none;
    }
    opacity: $form-check-label-disabled-opacity;
  `,
  ...each(FORM_VALIDATION_STATES, (state: string, data: ThemeData) => ({
    [`.form-check-input:${state}`]: css`
      border-color: ${(t: ThemeVariables) => data(t).color};

      &:focus {
        border-color: ${(t: ThemeVariables) =>
          data(t).color}; // added for bootstrap-rn
        @include platform(web) {
          box-shadow: 0 0 $input-btn-focus-blur $input-focus-width
            rgba(
              ${(t: ThemeVariables) => data(t).color},
              $input-btn-focus-color-opacity
            );
        }
      }
    `,
    [`.form-check-input:${state}:checked`]: css`
      background-color: ${(t: ThemeVariables) => data(t).color};
    `,
  })),
  '.form-switch.form-check .form-check-input': css`
    // float: left;
    // margin-left: $form-switch-padding-start * -1;
    margin-right: $form-switch-padding-start - $form-switch-width; // added for bootstrap-rn
  `,
  '.form-switch.form-check-reverse .form-check-input': css`
    // margin-right: $form-switch-padding-start * -1;
    margin-right: 0; // added for bootstrap-rn
    // margin-left: 0;
    margin-left: $form-switch-padding-start - $form-switch-width; // added for bootstrap-rn
  `,
  '.form-switch .form-check-input': css`
    width: $form-switch-width;
    background-image: ${(t: ThemeVariables) =>
      escapeSvg(t['form-switch-bg-image'])};
    background-position: left center;
    border-radius: $form-switch-border-radius;
    // @include transition($form-switch-transition);

    &:focus {
      background-image: ${(t: ThemeVariables) =>
        escapeSvg(t['form-switch-focus-bg-image'])};
    }
  `,
  '.form-switch .form-check-input:checked': css`
    background-position: $form-switch-checked-bg-position;

    // @if $enable-gradients {
    //   background-image: escape-svg($form-switch-checked-bg-image), var(--#{$prefix}gradient);
    // } @else {
    background-image: ${(t: ThemeVariables) =>
      escapeSvg(t['form-switch-checked-bg-image'])};
    // }

    &:focus {
      background-image: ${(t: ThemeVariables) =>
        escapeSvg(t['form-switch-checked-bg-image'])}; // added for bootstrap-rn
    }
  `,
});

const FormCheckInput = React.forwardRef<unknown, FormCheckInputProps>(
  (props, ref) => {
    const [modifierProps, modifierRef] = useModifier(
      'useFormField',
      props,
      ref,
    );

    const context = useContext(FormCheckContext);

    const {
      type,
      value,
      onFocus = () => {},
      onBlur = () => {},
      disabled = context ? context.disabled : false,
      valid = context ? context.valid : false,
      invalid = context ? context.invalid : false,
      useNativeComponent = false,
      autoFocus = false,
      style,
      ...elementProps
    } = modifierProps;

    const media = useMedia();
    const [focused, setFocused] = useState(autoFocus);

    const classes = getStyles(styles, [
      context && '.form-check .form-check-input',
      context?.reverse && '.form-check-reverse .form-check-input',
      '.form-check-input',
      type === 'checkbox' && '.form-check-input[type="checkbox"]',
      type === 'radio' && '.form-check-input[type="radio"]',
      value && '.form-check-input:checked',
      type === 'checkbox' &&
        value &&
        '.form-check-input[type="checkbox"]:checked',
      type === 'radio' && value && '.form-check-input[type="radio"]:checked',
      disabled && '.form-check-input:disabled',
      // validation
      valid && '.form-check-input:valid',
      valid && value && '.form-check-input:valid:checked',
      invalid && '.form-check-input:invalid',
      invalid && value && '.form-check-input:invalid:checked',
      // switch
      context &&
        type === 'switch' &&
        '.form-switch.form-check .form-check-input',
      context?.reverse &&
        type === 'switch' &&
        '.form-switch.form-check-reverse .form-check-input',
      type === 'switch' && '.form-switch .form-check-input',
      type === 'switch' && value && '.form-switch .form-check-input:checked',
    ]);

    const resolveStyle = useStyle([classes, style]);

    const BaseFormCheckInput =
      Platform.OS === 'web' && !useNativeComponent
        ? FormCheckInputWeb
        : FormCheckInputNative;

    return (
      <BaseFormCheckInput
        {...elementProps}
        ref={modifierRef}
        type={type}
        value={value}
        onFocus={() => {
          setFocused(true);
          onFocus();
        }}
        onBlur={() => {
          setFocused(false);
          onBlur();
        }}
        disabled={disabled}
        autoFocus={autoFocus}
        style={resolveStyle({
          media,
          interaction: { focus: focused, focusVisible: focused },
        })}
      />
    );
  },
);

FormCheckInput.displayName = 'FormCheckInput';

export default FormCheckInput;
