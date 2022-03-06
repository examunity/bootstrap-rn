import React, { useState } from 'react';
import { Platform, Picker as BasePicker } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Text from '../Text';
import useMedia from '../../hooks/useMedia';
import { getStyles, each } from '../../utils';
import { FORM_VALIDATION_STATES } from '../../theme/proxies';
import useStyle from '../../hooks/useStyle';
import useModifier from '../../hooks/useModifier';
import Offcanvas from '../offcanvas/Offcanvas';
import PickerContext from './PickerContext';
import PickerItem from './PickerItem';

const propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
  disabled: PropTypes.bool,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
  useNativeComponent: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

const styles = StyleSheet.create({
  '.form-select': css`
    // display: block;
    width: 100%;
    padding: $form-select-padding-y $form-select-indicator-padding
      $form-select-padding-y $form-select-padding-x;
    // See https://github.com/twbs/bootstrap/issues/32636
    // -moz-padding-start: subtract($form-select-padding-x, 3px);
    font-family: $form-select-font-family;
    font-size: $form-select-font-size;
    font-weight: $form-select-font-weight;
    line-height: $form-select-font-size * $form-select-line-height;
    color: $form-select-color;
    background-color: $form-select-bg;
    // background-image: escape-svg($form-select-indicator);
    // background-repeat: no-repeat;
    // background-position: $form-select-bg-position;
    // background-size: $form-select-bg-size;
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
      }
      /* @if $enable-shadows {
        @include box-shadow(
          $form-select-box-shadow,
          $form-select-focus-box-shadow
        );
      } @else {
        // Avoid using mixin so we can pass custom focus shadow properly
        box-shadow: $form-select-focus-box-shadow;
      } */
    }
  `,
  '.form-select-disabled': css`
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
    [`.form-select.is-${state}`]: css`
      border-color: ${(t) => data(t).color};

      &:focus {
        border-color: ${(t) => data(t).color};
        // box-shadow: $focus-box-shadow;
      }
    `,
  })),
  '.form-select-offcanvas': css``,
  '.form-select-offcanvas-body': css`
    align-items: center;
  `,
});

const Picker = React.forwardRef((props, ref) => {
  const [modifierProps, modifierRef] = useModifier('useFormField', props, ref);

  const {
    children,
    value,
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    placeholder,
    size,
    disabled = false,
    valid = false,
    invalid = false,
    useNativeComponent = false,
    style,
    styleName,
    ...elementProps
  } = modifierProps;

  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const media = useMedia();

  const classes = getStyles(styles, [
    '.form-select',
    disabled && '.form-select-disabled',
    size === 'sm' && '.form-select-sm',
    size === 'lg' && '.form-select-lg',
    valid && '.form-select.is-valid',
    invalid && '.form-select.is-invalid',
  ]);

  const resolveStyle = useStyle([classes, style], styleName);

  const provideWebComponent = Platform.OS === 'web' && !useNativeComponent;

  const commonProps = {
    onFocus: () => {
      if (disabled) return;

      setFocused(true);
      onFocus();
    },
    onBlur: () => {
      if (disabled) return;

      setFocused(false);
      onBlur();
    },
    disabled,
    style: resolveStyle({ media, interaction: { focused } }),
  };

  if (provideWebComponent) {
    return (
      <BasePicker
        {...elementProps}
        {...commonProps}
        ref={modifierRef}
        selectedValue={value}
        onValueChange={onChange}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {children}
      </BasePicker>
    );
  }

  const offcanvasClasses = getStyles(styles, ['.form-select-offcanvas']);
  const offcanvasBodyClasses = getStyles(styles, [
    '.form-select-offcanvas-body',
  ]);

  const items = React.Children.map(children, (child) => ({
    label: child.props.label,
    value: child.props.value,
  }));

  const selectedItem = items.find((item) => item.value === value);

  return (
    <PickerContext.Provider
      value={{
        value,
        onChange: (nextValue) => {
          onChange(nextValue);
          setOpen(false);
        },
        useNativeComponent: true,
      }}
    >
      <Text
        {...elementProps}
        {...commonProps}
        ref={modifierRef}
        // role "listbox" is not supported in react-native :(
        accessibilityRole="button"
        accessibilityDisabled={disabled}
        accessible
        focusable={!disabled}
        selectable={false}
        onPress={() => {
          if (disabled) return;

          setOpen(true);
        }}
      >
        {selectedItem ? selectedItem.label : placeholder}
      </Text>
      <Offcanvas
        placement="bottom"
        visible={open}
        onToggle={() => {
          setOpen(false);
        }}
        style={offcanvasClasses}
      >
        <Offcanvas.Body style={offcanvasBodyClasses}>{children}</Offcanvas.Body>
      </Offcanvas>
    </PickerContext.Provider>
  );
});

Picker.displayName = 'Picker';
Picker.propTypes = propTypes;

Picker.Item = PickerItem;

export default Picker;
