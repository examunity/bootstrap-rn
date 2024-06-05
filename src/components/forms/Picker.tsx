import React, { useState, useMemo, ReactNode, CSSProperties } from 'react';
import {
  Platform,
  TextInputFocusEventData,
  NativeSyntheticEvent,
} from 'react-native';
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
import { ThemeVariables } from '../../types';

export type PickerProps = {
  children: ReactNode;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholderTextColor?: string;
  size?: 'sm' | 'lg';
  disabled?: boolean;
  valid?: boolean;
  invalid?: boolean;
  useNativeComponent?: boolean;
  autoFocus?: boolean;
  style?: CSSProperties;
  styleName?: unknown;
};

const styles = StyleSheet.create({
  select: css`
    opacity: 1;
  `,
  '.form-select': css`
    width: 100%;
    padding: $form-select-padding-y $form-select-indicator-padding
      $form-select-padding-y $form-select-padding-x;
    font-family: $form-select-font-family;
    font-size: $form-select-font-size;
    font-weight: $form-select-font-weight;
    line-height: $form-select-font-size * $form-select-line-height;
    color: $form-select-color;
    background-color: $form-select-bg;
    background-image: ${(t: ThemeVariables) =>
      escapeSvg(t['form-select-indicator'])};
    background-repeat: no-repeat;
    background-position: $form-select-bg-position;
    background-size: $form-select-bg-size;
    border: $form-select-border-width solid $form-select-border-color;
    border-radius: $form-select-border-radius;
    @include platform(web) {
      appearance: none;
    }

    &:focus {
      border-color: $form-select-focus-border-color;
      @include platform(web) {
        outline-width: 0;
        box-shadow: $form-select-focus-box-shadow;
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
  ...each(FORM_VALIDATION_STATES, (state: string, data) => ({
    [`.form-select:${state}`]: css`
      border-color: ${(t: ThemeVariables) => data(t).color};

      &:focus {
        border-color: ${(t: ThemeVariables) => data(t).color};
        @include platform(web) {
          box-shadow: 0 0 $input-btn-focus-blur $input-focus-width
            rgba(
              ${(t: ThemeVariables) => data(t).color},
              $input-btn-focus-color-opacity
            );
        }
      }
    `,
  })),
});

const Picker = React.forwardRef<unknown, PickerProps>((props, ref) => {
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
    'select',
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
        onFocus={(event: NativeSyntheticEvent<TextInputFocusEventData>) => {
          setFocused(true);
          onFocus(event);
        }}
        onBlur={(event: NativeSyntheticEvent<TextInputFocusEventData>) => {
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

export default Object.assign(Picker, {
  Item: PickerItem,
});
