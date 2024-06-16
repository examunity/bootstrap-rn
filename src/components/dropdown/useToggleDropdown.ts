import type { GestureResponderEvent } from 'react-native';
import useForcedContext from '../../hooks/useForcedContext';
import DropdownContext from './DropdownContext';

export type ToggleDropdownProps = {
  onPress?: (event: GestureResponderEvent) => void;
  caret?: { direction?: string } | boolean;
};

export default function useToggleDropdown(props: ToggleDropdownProps) {
  const context = useForcedContext(DropdownContext);

  const { onPress: handlePress, caret, ...restProps } = props;

  return {
    ...restProps,
    id: context.identifier,
    ref: context.toggleRef,
    onPress: (event: GestureResponderEvent) => {
      if (handlePress) handlePress(event);

      context.setVisible(!context.visible);
    },
    'aria-haspopup': true,
    'aria-expanded': context.visible,
    active: context.visible,
    caret: caret === undefined ? { direction: context.direction } : caret,
  };
}
