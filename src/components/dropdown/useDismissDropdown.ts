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

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (props.onPress) props.onPress(event);
      context.setVisible(false);
    },
    [context, props.onPress],
  );

  const { ...restProps } = props;

  return {
    ...restProps,
    onPress: handlePress,
  };
}
