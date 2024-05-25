import React, { useState, useMemo } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import useMedia from '../../hooks/useMedia';
import { getStyles, each } from '../../utils';
import { FORM_VALIDATION_STATES } from '../../theme/proxies';
import { escapeSvg } from '../../theme/functions';
import useStyle from '../../hooks/useStyle';
import useModifier from '../../hooks/useModifier';
import PickerWeb from './internals/PickerWeb';
import PickerNative from './internals/PickerNative';
import PickerItem from './PickerItem';
import PickerContext from './PickerContext';

/* eslint-disable react/no-unused-prop-types */
const propTypes = {
  children: PropTypes.node.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholderTextColor: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
  disabled: PropTypes.bool,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
  useNativeComponent: PropTypes.bool,
  autoFocus: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};
/* eslint-enable */

const styles = StyleSheet.create({
  select: css`
    opacity: 1;
  `,
  '.form-select': css`
    // display: block;
    width: 100%;
    padding: $form-select-padding-y $form-select-indicator-padding
      $form-select-padding-y $form-select-padding-x;
    /* @include platform(web) {
      // See https://github.com/twbs/bootstrap/issues/32636
      -moz-padding-start: subtract($form-select-padding-x, 3px);
    } */
    font-family: $form-select-font-family;
    font-size: $form-select-font-size;
    font-weight: $form-select-font-weight;
    line-height: $form-select-font-size * $form-select-line-height;
    color: $form-select-color;
    background-color: $form-select-bg;
    background-image: ${(t) => escapeSvg(t['form-select-indicator'])};
    background-repeat: no-repeat;
    background-position: $form-select-bg-position;
    background-size: $form-select-bg-size;
    border: $form-select-border-width solid $form-select-border-color;
    border-radius: $form-select-border-radius;
    // @include box-shadow($form-select-box-shadow);
    // @include transition($form-select-transition);
    @include platform(web) {
      appearance: none;
    }

    &:focus {
      border-color: $form-select-focus-border-color;
      @include platform(web) {
        outline-width: 0; // outline: 0;
        // @if $enable-shadows {
        //   @include box-shadow(
        //     $form-select-box-shadow,
        //     $form-select-focus-box-shadow
        //   );
        // } @else {
        //   // Avoid using mixin so we can pass custom focus shadow properly
        box-shadow: $form-select-focus-box-shadow;
        // }
      }
    }
  `,
  '.form-select.disabled': css`
    color: $form-select-disabled-color;
    background-color: $form-select-disabled-bg;
    border-color: $form-select-disabled-border-color;
  `,
  '.form-select-sm': css`
    padding-top: $form-select-padding-y-sm;
    padding-bottom: $form-select-padding-y-sm;
    padding-left: $form-select-padding-x-sm;
    font-size: $form-select-font-size-sm;
    border-radius: $form-select-border-radius-sm;
  `,
  '.form-select-lg': css`
    padding-top: $form-select-padding-y-lg;
    padding-bottom: $form-select-padding-y-lg;
    padding-left: $form-select-padding-x-lg;
    font-size: $form-select-font-size-lg;
    border-radius: $form-select-border-radius-lg;
  `,
  ...each(FORM_VALIDATION_STATES, (state, data) => ({
    [`.form-select:${state}`]: css`
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

const Picker = React.forwardRef((props, ref) => {
  const [modifierProps, modifierRef] = useModifier('useFormField', props, ref);

  const {
    children,
    onFocus = () => {},
    onBlur = () => {},
    placeholderTextColor = StyleSheet.value('input-placeholder-color'),
    size,
    disabled = false,
    valid = false,
    invalid = false,
    useNativeComponent = false,
    autoFocus = false,
    style,
    styleName,
    ...elementProps
  } = modifierProps;

  const media = useMedia();
  const [focused, setFocused] = useState(autoFocus);

  const classes = getStyles(styles, [
    'select', // reboot
    '.form-select',
    disabled && '.form-select.disabled',
    size === 'sm' && '.form-select-sm',
    size === 'lg' && '.form-select-lg',
    valid && '.form-select:valid',
    invalid && '.form-select:invalid',
  ]);

  const resolveStyle = useStyle([classes, style], styleName);

  const BasePicker =
    Platform.OS === 'web' && !useNativeComponent ? PickerWeb : PickerNative;

  const contextValue = useMemo(
    () => ({
      useNativeComponent,
    }),
    [useNativeComponent],
  );

  return (
    <PickerContext.Provider value={contextValue}>
      <BasePicker
        {...elementProps}
        ref={modifierRef}
        placeholderTextColor={placeholderTextColor}
        onFocus={(event) => {
          setFocused(true);
          onFocus(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur(event);
        }}
        disabled={disabled}
        autoFocus={autoFocus}
        style={resolveStyle({
          media,
          interaction: { focus: focused, focusVisible: focused },
        })}
      >
        {children}
      </BasePicker>
    </PickerContext.Provider>
  );
});

Picker.displayName = 'Picker';
Picker.propTypes = propTypes;

Picker.Item = PickerItem;

export default Picker;
