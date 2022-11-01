import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../../style/StyleSheet';
import css from '../../../style/css';
import Pressable from '../../Pressable';
import Text from '../../Text';
import Offcanvas from '../../offcanvas/Offcanvas';
import useBackground from '../../../hooks/useBackground';
import PickerNativeContext from './PickerNativeContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  onValueChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  nativeID: PropTypes.any,
};

const styles = StyleSheet.create({
  menu: css`
    align-items: center;
  `,
});

// Ref: https://reactnative.dev/docs/text-style-props
const textStyleKeys = [
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'includeFontPaddingAndroid',
  'fontVariant',
  'letterSpacing',
  'lineHeight',
  'textAlign',
  'textAlignVerticalAndroid',
  'textDecorationColoriOS',
  'textDecorationLine',
  'textDecorationStyleiOS',
  'textShadowColor',
  'textShadowOffset',
  'textShadowRadius',
  'textTransform',
  'writingDirection',
];

const extractTextStyles = (style) => {
  const textStyles = {};

  Object.entries(style).forEach(([key, value]) => {
    if (textStyleKeys.includes(key)) {
      textStyles[key] = value;
    }
  });

  return textStyles;
};

const PickerNative = React.forwardRef((props, ref) => {
  const {
    children,
    selectedValue,
    onValueChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    placeholder,
    placeholderTextColor = StyleSheet.value('input-placeholder-color'),
    disabled = false,
    style,
    nativeID,
  } = props;

  const background = useBackground(style);

  const [open, setOpen] = useState(false);

  const items = React.Children.map(children, (child) => ({
    label: child.props.label,
    value: child.props.value,
  }));

  const selectedItem = items.find((item) => item.value === selectedValue);

  const textStyle = extractTextStyles(background.style);

  const showPlaceholder =
    placeholder && (selectedValue === undefined || selectedValue === null);

  return (
    <>
      <Pressable
        ref={ref}
        accessibilityRole="combobox"
        accessibilityDisabled={disabled}
        accessible
        focusable={!disabled}
        selectable={false}
        onPress={() => {
          setOpen(true);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        style={background.style}
        nativeID={nativeID}
      >
        {background.element}
        <Text
          numberOfLines={1}
          style={[
            textStyle,
            showPlaceholder && { color: placeholderTextColor },
          ]}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
      </Pressable>
      <Offcanvas
        placement="bottom"
        visible={open}
        onToggle={() => {
          setOpen(false);
        }}
      >
        <Offcanvas.Body contentContainerStyle={styles.menu}>
          <PickerNativeContext.Provider
            value={{
              selectedValue,
              onValueChange(nextValue) {
                onValueChange(nextValue);
                setOpen(false);
              },
            }}
          >
            {children}
          </PickerNativeContext.Provider>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
});

PickerNative.propTypes = propTypes;

export default PickerNative;
