import { useCallback } from 'react';
import type { GestureResponderEvent } from 'react-native';
import useForcedContext from '../../hooks/useForcedContext';
import DropdownContext from './DropdownContext';

export interface UseDismissDropdownProps {
  onPress?: null | ((event: GestureResponderEvent) => void);
}

export default function useDismissDropdown<T>(
  props: UseDismissDropdownProps & T,
) {
  const context = useForcedContext(DropdownContext);

  const { onPress, ...restProps } = props;

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      context.setVisible(false);

      onPress?.(event);
    },
    [context, onPress],
  );

  return {
    ...restProps,
    onPress: handlePress,
  };
}
