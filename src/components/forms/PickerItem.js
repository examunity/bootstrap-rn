import React, { useContext } from 'react';
import { Platform, Picker as WebPicker } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Pressable from '../Pressable';
import Text from '../Text';
import useMedia from '../../hooks/useMedia';
import { getStyles } from '../../utils';
import useStyle from '../../hooks/useStyle';
import PickerContext from './PickerContext';

const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  '.form-select-item': css`
    margin: 0.25rem 1rem;
    padding: 0.25rem;
  `,
  '.form-select-item.disabled': css``,
});

const PickerItem = React.forwardRef((props, ref) => {
  const { label, value, disabled = false } = props;

  const context = useContext(PickerContext);
  const media = useMedia();

  const provideWebComponent =
    Platform.OS === 'web' && (!context || !context.useNativeComponent);

  if (provideWebComponent) {
    return (
      <WebPicker.Item
        ref={ref}
        label={label}
        value={value}
        disabled={disabled}
      />
    );
  }

  const classes = getStyles(styles, [
    '.form-select-item',
    disabled && '.form-select-item.disabled',
  ]);

  const resolveStyle = useStyle(classes);

  const selected = value === context.value;

  return (
    <Pressable
      ref={ref}
      onPress={() => {
        context.onChange(value);
      }}
      accessibilitySelected={selected}
      disabled={disabled}
      style={resolveStyle({ media })}
    >
      <Text styleName={selected && 'text-primary'}>{label}</Text>
    </Pressable>
  );
});

PickerItem.displayName = 'PickerItem';
PickerItem.propTypes = propTypes;

export default PickerItem;
