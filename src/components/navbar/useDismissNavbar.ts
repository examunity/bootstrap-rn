import type { GestureResponderEvent } from 'react-native';
import useForcedContext from '../../hooks/useForcedContext';
import NavbarContext from './NavbarContext';

interface DismissNavbarProps {
  onPress?: (event: GestureResponderEvent) => void;
}

export default function useDismissNavbar(props: DismissNavbarProps) {
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
