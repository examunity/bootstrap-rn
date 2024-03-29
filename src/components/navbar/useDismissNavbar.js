import useForcedContext from '../../hooks/useForcedContext';
import NavbarContext from './NavbarContext';

export default function useDismissNavbar(props) {
  const context = useForcedContext(NavbarContext);

  const { onPress: handlePress, ...restProps } = props;

  return {
    ...restProps,
    onPress: (event) => {
      if (handlePress) handlePress(event);

      context.setExpanded(false);
    },
    'aria-label': 'Close',
  };
}
