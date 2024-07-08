import type { GestureResponderEvent } from 'react-native';
import useForcedContext from '../../hooks/useForcedContext';
import NavbarContext from './NavbarContext';

export interface UseToggleNavbarProps {
  onPress?: null | ((event: GestureResponderEvent) => void);
}

export default function useToggleNavbar<T>(props: UseToggleNavbarProps & T) {
  const context = useForcedContext(NavbarContext);

  const { onPress: handlePress, ...restProps } = props;

  return {
    ...restProps,
    id: context.identifier,
    onPress: (event: GestureResponderEvent) => {
      if (handlePress) handlePress(event);

      context.setExpanded((value) => !value);
    },
    accessibilityControls: context.identifier,
    'aria-expanded': context.expanded,
    'aria-label': 'Toggle navigation',
  };
}
