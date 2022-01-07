import React from 'react';
import PropTypes from 'prop-types';
import { Svg, Path, Circle } from 'react-native-svg';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Pressable from '../Pressable';
import View from '../View';
import Text from '../Text';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  inputStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  labelStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.form-check': css`
    // display: block;
    flex-direction: row; // added for bootstyle
    min-height: $form-check-min-height;
    padding-left: $form-check-padding-start;
    margin-bottom: $form-check-margin-bottom;
  `,
  '.form-check-disabled': css`
    opacity: $form-check-label-disabled-opacity;
  `,
  '.form-check-input': css`
    // Use additional variables instead of brackets, because brackets not supported yet.
    $lineHeight: $line-height-base * 1rem;
    $rawMarginTop: $lineHeight - $form-check-input-width;

    // float: left;
    margin-left: $form-check-padding-start * -1;

    width: $form-check-input-width;
    height: $form-check-input-width;
    margin-top: $rawMarginTop * 0.5; // line-height minus check height
    // vertical-align: top;
    background-color: $form-check-input-bg;
    // background-repeat: no-repeat;
    // background-position: center;
    // background-size: contain;
    border: $form-check-input-border;
    // appearance: none;
    // color-adjust: exact; // Keep themed appearance for print
    // @include transition($form-check-transition);

    &:active {
      // filter: $form-check-input-active-filter;
    }

    &:focus {
      border-color: $form-check-input-focus-border;
      // outline: 0;
      // box-shadow: $form-check-input-focus-box-shadow;
    }
  `,
  '.form-check-input-checkbox': css`
    border-radius: $form-check-input-border-radius;
  `,
  '.form-check-input-radio': css`
    border-radius: $form-check-radio-border-radius;
  `,
  '.form-check-input-checked': css`
    background-color: $form-check-input-checked-bg-color;
    border-color: $form-check-input-checked-border-color;
  `,
  '.form-check-label': css`
    color: $form-check-label-color;
    @include platform(web) {
      cursor: $form-check-label-cursor;
    }
  `,
});

const CheckInput = React.forwardRef((props, ref) => {
  const {
    children,
    type,
    value,
    onChange = () => {},
    disabled = false,
    style,
    inputStyle,
    labelStyle,
    ...elementProps
  } = props;

  const classes = getStyles(styles, [
    '.form-check',
    disabled && '.form-check-disabled',
  ]);

  const inputClasses = getStyles(styles, [
    '.form-check-input',
    type === 'checkbox' && '.form-check-input-checkbox',
    type === 'radio' && '.form-check-input-radio',
    value && '.form-check-input-checked',
  ]);

  const labelClasses = getStyles(styles, ['.form-check-label']);

  const handlePress = () => {
    onChange(value);
  };

  // TODO &:focus, &:active

  return (
    <Pressable
      {...elementProps}
      ref={ref}
      accessibilityRole={type}
      accessibilityChecked={value}
      onPress={handlePress}
      disabled={disabled}
      style={[classes, style]}
    >
      <View style={[inputClasses, inputStyle]}>
        {type === 'checkbox' && value && (
          <Svg viewBox="0 0 20 20">
            <Path
              fill="none"
              stroke={StyleSheet.value('form-check-input-checked-color')}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="m6 10 3 3 6-6"
            />
          </Svg>
        )}
        {type === 'radio' && value && (
          <Svg viewBox="-4 -4 8 8">
            <Circle
              r={2}
              fill={StyleSheet.value('form-check-input-checked-color')}
            />
          </Svg>
        )}
      </View>
      <Text style={[labelClasses, labelStyle]}>{children}</Text>
    </Pressable>
  );
});

CheckInput.displayName = 'CheckInput';
CheckInput.propTypes = propTypes;

export default CheckInput;
