import useForcedContext from '../../hooks/useForcedContext';
import NavbarContext from './NavbarContext';

export default function useDismissNavbar(props) {
  const context = useForcedContext(NavbarContext);

  const { onPress: handlePress, ...restProps } = props;

  return {
    ...restProps,
    onPress: (event) => {
      if (handlePress) handlePress(event);

      if (!event.defaultPrevented) {
        context.setExpanded(false);
      }
    },
    accessibilityLabel: 'Close',
  };
}
