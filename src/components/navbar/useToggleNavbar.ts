import type { GestureResponderEvent } from 'react-native';
import useForcedContext from '../../hooks/useForcedContext';
import NavbarContext from './NavbarContext';

type ToggleButtonProps = {
  onPress?: (event: GestureResponderEvent) => void;
};

export default function useToggleNavbar(props: ToggleButtonProps) {
  const context = useForcedContext(NavbarContext);

  const { onPress: handlePress, ...restProps } = props;

  return {
    ...restProps,
    id: context.identifier,
    onPress: (event: GestureResponderEvent) => {
      if (handlePress) handlePress(event);

      context.setExpanded((value) => !value);
    },
    accessibilitControls: context.identifier,
    'aria-expanded': context.expanded,
    'aria-label': 'Toggle navigation',
  };
}
