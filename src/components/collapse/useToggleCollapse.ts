import type { GestureResponderEvent } from 'react-native';
import useForcedContext from '../../hooks/useForcedContext';
import CollapseContext from './CollapseContext';

type ToggleCollapseProps = {
  onPress?: (event: GestureResponderEvent) => void;
};

export default function useToggleCollapse<T>(props: ToggleCollapseProps & T) {
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
