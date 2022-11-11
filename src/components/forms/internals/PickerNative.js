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
  children: PropTypes.node,
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
  renderText: PropTypes.func,
  renderMenu: PropTypes.func,
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

const renderTextDefault = ({ children, selectedValue }) => {
  const items = React.Children.map(children, (child) => ({
    label: child.props.label,
    value: child.props.value,
  }));

  const selectedItem = items.find((item) => item.value === selectedValue);

  return selectedItem?.label;
};

const renderMenuDefault = ({
  children,
  selectedValue,
  handleValueChange,
  handleClose,
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
    renderText = renderTextDefault,
    renderMenu = renderMenuDefault,
    style,
    ...elementProps
  } = props;

  const background = useBackground(style);

  const [visible, setVisible] = useState(false);

  const textStyle = extractTextStyles(background.style);

  const showPlaceholder =
    placeholder && (selectedValue === undefined || selectedValue === null);

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
        accessibilityDisabled={disabled}
        accessible
        focusable={!disabled}
        selectable={false}
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
            ? placeholder
            : renderText({ children, selectedValue })}
        </Text>
      </Pressable>
      {visible &&
        renderMenu({
          children,
          selectedValue,
          handleValueChange,
          handleClose,
        })}
    </>
  );
});

PickerNative.propTypes = propTypes;

export default PickerNative;
