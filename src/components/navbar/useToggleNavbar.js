import useForcedContext from '../../hooks/useForcedContext';
import NavbarContext from './NavbarContext';

export default function useToggleNavbar(props) {
  const context = useForcedContext(NavbarContext);

  const { onPress: handlePress, ...restProps } = props;

  return {
    ...restProps,
    nativeID: context.identifier,
    onPress: (event) => {
      if (handlePress) handlePress(event);

      if (!event.defaultPrevented) {
        context.setExpanded((value) => !value);
      }
    },
    accessibilitControls: context.identifier,
    accessibilityExpanded: context.expanded,
    accessibilityLabel: 'Toggle navigation',
  };
}
