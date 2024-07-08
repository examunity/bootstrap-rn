import type { GestureResponderEvent } from 'react-native';
import useForcedContext from '../../hooks/useForcedContext';
import NavbarContext from './NavbarContext';

export interface UseDismissNavbarProps {
  onPress?: null | ((event: GestureResponderEvent) => void);
}

export default function useDismissNavbar<T>(props: UseDismissNavbarProps & T) {
  const context = useForcedContext(NavbarContext);

  const { onPress: handlePress, ...restProps } = props;

  return {
    ...restProps,
    onPress: (event: GestureResponderEvent) => {
      if (handlePress) handlePress(event);

      context.setExpanded(false);
    },
    'aria-label': 'Close',
  };
}
