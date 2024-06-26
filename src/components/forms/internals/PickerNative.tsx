import React, { useState, useMemo } from 'react';
import {
  TextStyle,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  TargetedEvent,
  StyleSheet as StyleUtils,
} from 'react-native';
import StyleSheet from '../../../style/StyleSheet';
import css from '../../../style/css';
import Pressable, { PressableProps, PressableRef } from '../../Pressable';
import Text from '../../Text';
import Offcanvas from '../../offcanvas/Offcanvas';
import useBackground from '../../../hooks/useBackground';
import PickerNativeContext from './PickerNativeContext';
import { BaseStyle } from '../../../types';

type MenuComponentProps = {
  children: React.ReactElement;
  selectedValue?: boolean | number | string | object;
  onValueChange: (value?: boolean | number | string | object) => void;
  onClose: () => void;
};

export interface PickerNativeProps extends PressableProps {
  children: React.ReactElement;
  selectedValue?: boolean | number | string | object;
  onValueChange?: (value?: boolean | number | string | object) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  disabled?: boolean;
  MenuComponent?: React.FC<MenuComponentProps>;
  autoFocus?: boolean;
  style: TextStyle[];
}

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

const extractTextStyles = (style: BaseStyle[]) => {
  const flattenedStyle = StyleUtils.flatten(style);
  const textStyles: { [key: string]: string } = {};

  Object.entries(flattenedStyle).forEach(([key, value]) => {
    if (textStyleKeys.includes(key)) {
      textStyles[key] = value;
    }
  });

  return textStyles;
};

type GetTextProps = {
  children: React.ReactElement;
  selectedValue?: boolean | number | string | object;
};

const getText = ({ children, selectedValue }: GetTextProps) => {
  const items = React.Children.map(children, (child) => ({
    label: child.props.label,
    value: child.props.value,
  }));

  const selectedItem = items?.find((item) => item.value === selectedValue);

  return selectedItem?.label;
};

function DefaultMenuComponent({
  children,
  selectedValue,
  onValueChange: handleValueChange,
  onClose: handleClose,
}: MenuComponentProps) {
  const contextValue = useMemo(
    () => ({
      selectedValue,
      handleValueChange,
    }),
    [selectedValue, handleValueChange],
  );

  return (
    <Offcanvas placement="bottom" visible onToggle={handleClose}>
      <Offcanvas.Body contentContainerStyle={styles.menu}>
        <PickerNativeContext.Provider value={contextValue}>
          {children}
        </PickerNativeContext.Provider>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
/* eslint-enable */

const PickerNative = React.forwardRef<PressableRef, PickerNativeProps>(
  (props, ref) => {
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

    const showPlaceholder =
      selectedValue === undefined || selectedValue === null;

    const handleValueChange = (
      nextValue?: boolean | number | string | object,
    ) => {
      onValueChange(nextValue);
      setVisible(false);
    };
    const handleClose = () => {
      setVisible(false);
    };

    const handleFocus = (event: NativeSyntheticEvent<TargetedEvent>) => {
      onFocus(event as NativeSyntheticEvent<TextInputFocusEventData>);
    };

    const handleBlur = (event: NativeSyntheticEvent<TargetedEvent>) => {
      onBlur(event as NativeSyntheticEvent<TextInputFocusEventData>);
    };

    return (
      <>
        <Pressable
          {...elementProps}
          ref={ref}
          role="combobox"
          onPress={() => {
            setVisible(true);
          }}
          onFocus={(event: NativeSyntheticEvent<TargetedEvent>) => {
            handleFocus(event);
          }}
          onBlur={(event: NativeSyntheticEvent<TargetedEvent>) => {
            handleBlur(event);
          }}
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
  },
);

export default PickerNative;
