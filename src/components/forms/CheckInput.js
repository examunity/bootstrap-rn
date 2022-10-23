import React, { useState } from 'react';
import {
  Platform,
  unstable_createElement as createElement,
} from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Pressable from '../Pressable';
import View from '../View';
import { getStyles, each, concatFns } from '../../utils';
import useMedia from '../../hooks/useMedia';
import useStyle from '../../hooks/useStyle';
import useBackground from '../../hooks/useBackground';
import useModifier from '../../hooks/useModifier';
import { FORM_VALIDATION_STATES } from '../../theme/proxies';
import { escapeSvg } from '../../theme/functions';

const propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['checkbox', 'radio', 'switch']).isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onPress: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
  useNativeComponent: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  inputStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  labelStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  labelTextStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.form-check': css`
    // display: block;
    flex-direction: row; // added for bootstrap-rn
    min-height: $form-check-min-height;
    padding-left: $form-check-padding-start;
    margin-bottom: $form-check-margin-bottom;
  `,
  '.form-check.disabled': css`
    opacity: $form-check-label-disabled-opacity;
  `,
  '.form-check-input': css`
    // Use additional variables instead of brackets, because brackets not supported yet.
    $lineHeight: $line-height-base * 1rem;
    $rawMarginTop: $lineHeight - $form-check-input-width;

    // float: left;
    margin-left: $form-check-padding-start * -1;
    margin-right: $form-check-padding-start - $form-check-input-width; // added for bootstrap-rn

    width: $form-check-input-width;
    height: $form-check-input-width;
    margin-top: $rawMarginTop * 0.5; // line-height minus check height
    // vertical-align: top;
    background-color: $form-check-input-bg;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: $form-check-input-border;
    @include platform(web) {
      appearance: none;
      user-select: none; // added for bootstrap-rn
    }
    // color-adjust: exact; // Keep themed appearance for print
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
  '.form-check-input-checkbox': css`
    border-radius: $form-check-input-border-radius;
  `,
  '.form-check-input-radio': css`
    border-radius: $form-check-radio-border-radius;
  `,
  '.form-check-input:checked': css`
    background-color: $form-check-input-checked-bg-color;
    border-color: $form-check-input-checked-border-color;
  `,
  '.form-check-input-checkbox:checked': css`
    // @if $enable-gradients {
    //   background-image: escape-svg($form-check-input-checked-bg-image), var(--#{$variable-prefix}gradient);
    // } @else {
    background-image: ${(t) =>
      escapeSvg(t['form-check-input-checked-bg-image'])};
    // }
  `,
  '.form-check-input-radio:checked': css`
    // @if $enable-gradients {
    //   background-image: escape-svg($form-check-radio-checked-bg-image), var(--#{$variable-prefix}gradient);
    // } @else {
    background-image: ${(t) =>
      escapeSvg(t['form-check-radio-checked-bg-image'])};
    // }
  `,
  '.form-check-label': css`
    color: $form-check-label-color;
    @include platform(web) {
      cursor: $form-check-label-cursor;
    }
  `,
  ...each(FORM_VALIDATION_STATES, (state, data) => ({
    [`.form-check-input.is-${state}`]: css`
      border: ${(t) => data(t).color};

      &:focus {
        // box-shadow: $focus-box-shadow;
      }
    `,
    [`.form-check-input-checked.is-${state}`]: css`
      background-color: ${(t) => data(t).color};
    `,
    [`.form-check-label.is-${state}`]: css`
      color: ${(t) => data(t).color};
    `,
  })),
  '.form-switch': css`
    padding-left: $form-switch-padding-start;
  `,
  '.form-switch .form-check-input': css`
    width: $form-switch-width;
    margin-left: $form-switch-padding-start * -1;
    background-image: ${(t) => escapeSvg(t['form-switch-bg-image'])};
    background-position: left center;
    border-radius: $form-switch-border-radius;
    // @include transition($form-switch-transition);

    &:focus {
      background-image: ${(t) => escapeSvg(t['form-switch-focus-bg-image'])};
    }
  `,
  '.form-switch .form-check-input:checked': css`
    background-position: $form-switch-checked-bg-position;

    // @if $enable-gradients {
    //   background-image: escape-svg($form-switch-checked-bg-image), var(--#{$prefix}gradient);
    // } @else {
    background-image: ${(t) => escapeSvg(t['form-switch-checked-bg-image'])};
    // }

    &:focus {
      background-image: ${(t) =>
        escapeSvg(t['form-switch-checked-bg-image'])}; // added for bootstrap-rn
    }
  `,
});

const WebInput = (props) => createElement('input', props);

const CheckInput = React.forwardRef((props, ref) => {
  const [modifierProps, modifierRef] = useModifier('useFormField', props, ref);

  const {
    children,
    type,
    value,
    onChange: handleChange,
    onPress: handlePress,
    onFocus = () => {},
    onBlur = () => {},
    label,
    disabled = false,
    valid = false,
    invalid = false,
    useNativeComponent = false,
    style,
    inputStyle,
    labelStyle,
    labelTextStyle,
    ...elementProps
  } = modifierProps;

  const media = useMedia();
  const [focused, setFocused] = useState(false);

  const classes = getStyles(styles, [
    '.form-check',
    disabled && '.form-check.disabled',
    type === 'switch' && '.form-switch',
  ]);

  const inputClasses = getStyles(styles, [
    '.form-check-input',
    type === 'checkbox' && '.form-check-input-checkbox',
    type === 'radio' && '.form-check-input-radio',
    type === 'switch' && '.form-switch .form-check-input',
    value && '.form-check-input:checked',
    type === 'checkbox' && value && '.form-check-input-checkbox:checked',
    type === 'radio' && value && '.form-check-input-radio:checked',
    type === 'switch' && value && '.form-switch .form-check-input:checked',
    valid && '.form-check-input.is-valid',
    valid && value && '.form-check-input-checked.is-valid',
    invalid && '.form-check-input.is-invalid',
    invalid && value && '.form-check-input-checked.is-invalid',
  ]);

  const labelTextClasses = getStyles(styles, [
    '.form-check-label',
    valid && '.form-check-label.is-valid',
    invalid && '.form-check-label.is-invalid',
  ]);

  const resolveInputStyle = useStyle([inputClasses, inputStyle]);
  const background = useBackground(
    resolveInputStyle({ media, interaction: { focused } }),
  );

  const handleFocus = () => {
    if (disabled) return;

    setFocused(true);
    onFocus();
  };
  const handleBlur = () => {
    setFocused(false);
    onBlur();
  };

  const provideWebComponent = Platform.OS === 'web' && !useNativeComponent;

  if (provideWebComponent) {
    return (
      <View accessibilityRole="label" style={[classes, style]}>
        <WebInput
          type={type === 'switch' ? 'checkbox' : type}
          checked={value}
          onChange={concatFns(() => {
            handleChange(!value);
          }, handlePress)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          style={background.style}
        />
        {children && (
          <View
            style={labelStyle}
            textStyle={[labelTextClasses, labelTextStyle]}
          >
            {children}
          </View>
        )}
      </View>
    );
  }

  return (
    <Pressable
      {...elementProps}
      ref={modifierRef}
      accessibilityRole={type}
      accessibilityChecked={value}
      accessibilityLabel={label}
      onPress={concatFns(() => {
        handleChange(!value);
      }, handlePress)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      style={[classes, style]}
    >
      <View style={background.style}>{background.element}</View>
      {children && (
        <View style={labelStyle} textStyle={[labelTextClasses, labelTextStyle]}>
          {children}
        </View>
      )}
    </Pressable>
  );
});

CheckInput.displayName = 'CheckInput';
CheckInput.propTypes = propTypes;

export default CheckInput;
