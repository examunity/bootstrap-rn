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
  MenuComponent: PropTypes.elementType,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
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

const getText = ({ children, selectedValue }) => {
  const items = React.Children.map(children, (child) => ({
    label: child.props.label,
    value: child.props.value,
  }));

  const selectedItem = items.find((item) => item.value === selectedValue);

  return selectedItem?.label;
};

/* eslint-disable react/prop-types */
const DefaultMenuComponent = ({
  children,
  selectedValue,
  onValueChange: handleValueChange,
  onClose: handleClose,
}) => (
  <Offcanvas placement="bottom" visible onToggle={handleClose}>
    <Offcanvas.Body contentContainerStyle={styles.menu}>
      <PickerNativeContext.Provider
        value={{
          selectedValue,
          handleValueChange,
        }}
      >
        {children}
      </PickerNativeContext.Provider>
    </Offcanvas.Body>
  </Offcanvas>
);
/* eslint-enable */

const PickerNative = React.forwardRef((props, ref) => {
  const {
    children,
    selectedValue,
    onValueChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    placeholder,
    placeholderTextColor,
    disabled = false,
    MenuComponent = DefaultMenuComponent,
    style,
    ...elementProps
  } = props;

  const background = useBackground(style);

  const [visible, setVisible] = useState(false);

  const textStyle = extractTextStyles(background.style);

  const showPlaceholder = selectedValue === undefined || selectedValue === null;

  const handleValueChange = (nextValue) => {
    onValueChange(nextValue);
    setVisible(false);
  };
  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Pressable
        {...elementProps}
        ref={ref}
        accessibilityRole="combobox"
        onPress={() => {
          setVisible(true);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        style={background.style}
      >
        {background.element}
        <Text
          numberOfLines={1}
          style={[
            textStyle,
            showPlaceholder && { color: placeholderTextColor },
          ]}
        >
          {showPlaceholder
            ? placeholder || <Text>&nbsp;</Text>
            : getText({ children, selectedValue })}
        </Text>
      </Pressable>
      {visible && (
        <MenuComponent
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          onClose={handleClose}
        >
          {children}
        </MenuComponent>
      )}
    </>
  );
});

PickerNative.propTypes = propTypes;

export default PickerNative;
