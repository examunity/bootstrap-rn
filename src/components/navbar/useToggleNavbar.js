import useForcedContext from '../../hooks/useForcedContext';
import NavbarContext from './NavbarContext';

export default function useToggleNavbar(props) {
  const context = useForcedContext(NavbarContext);

  const { onPress: handlePress, ...restProps } = props;

  return {
    ...restProps,
    id: context.identifier,
    onPress: (event) => {
      if (handlePress) handlePress(event);

      context.setExpanded((value) => !value);
    },
    accessibilitControls: context.identifier,
    'aria-expanded': context.expanded,
    'aria-label': 'Toggle navigation',
  };
}
