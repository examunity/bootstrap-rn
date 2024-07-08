import type { GestureResponderEvent } from 'react-native';
import useForcedContext from '../../hooks/useForcedContext';
import CollapseContext from './CollapseContext';

export interface UseToggleCollapseProps {
  onPress?: null | ((event: GestureResponderEvent) => void);
}

export default function useToggleCollapse<T>(
  props: UseToggleCollapseProps & T,
) {
  const context = useForcedContext(CollapseContext);

  const { onPress: handlePress, ...restProps } = props;

  return {
    ...restProps,
    onPress: (event: GestureResponderEvent) => {
      handlePress?.(event);

      context.setVisible((value: boolean) => !value);
    },
    'aria-expanded': context.visible,
    'aria-controls': context.identifier,
  };
}
