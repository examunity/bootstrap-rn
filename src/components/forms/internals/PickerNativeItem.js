import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../../style/StyleSheet';
import css from '../../../style/css';
import Pressable from '../../Pressable';
import Text from '../../Text';
import useMedia from '../../../hooks/useMedia';
import { getStyles } from '../../../utils';
import useStyle from '../../../hooks/useStyle';
import useForcedContext from '../../../hooks/useForcedContext';
import PickerNativeContext from './PickerNativeContext';

const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  item: css`
    margin: 0.25rem 1rem;
    padding: 0.25rem;
  `,
  itemDisabled: css``,
});

const PickerNativeItem = React.forwardRef((props, ref) => {
  const { label, value, disabled = false } = props;

  const { selectedValue, handleValueChange } = useForcedContext(
    PickerNativeContext,
  );
  const media = useMedia();

  const classes = getStyles(styles, ['item', disabled && 'itemDisabled']);

  const resolveStyle = useStyle(classes);

  const selected = value === selectedValue;

  return (
    <Pressable
      ref={ref}
      onPress={() => {
        handleValueChange(value);
      }}
      aria-selected={selected}
      disabled={disabled}
      style={resolveStyle({ media })}
    >
      <Text styleName={selected && 'text-primary'}>{label}</Text>
    </Pressable>
  );
});

PickerNativeItem.displayName = 'PickerNativeItem';
PickerNativeItem.propTypes = propTypes;

export default PickerNativeItem;
