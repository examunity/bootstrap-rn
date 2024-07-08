import type { GestureResponderEvent } from 'react-native';
import useForcedContext from '../../hooks/useForcedContext';
import DropdownContext from './DropdownContext';
import { CaretProps } from '../Caret';

export interface UseToggleDropdownProps {
  onPress?: null | ((event: GestureResponderEvent) => void);
  caret?: boolean | CaretProps;
}

export default function useToggleDropdown<T>(
  props: UseToggleDropdownProps & T,
) {
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
