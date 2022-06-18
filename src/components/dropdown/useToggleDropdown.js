import useForcedContext from '../../hooks/useForcedContext';
import DropdownContext from './DropdownContext';

export default function useToggleDropdown(props) {
  const context = useForcedContext(DropdownContext);

  const { onPress: handlePress, ...restProps } = props;

  return {
    ...restProps,
    nativeID: context.identifier,
    ref: context.toggleRef,
    onPress: (event) => {
      if (handlePress) handlePress(event);
      context.setVisible((value) => !value);
    },
    accessibilityHasPopup: true,
    accessibilityExpanded: context.visible,
  };
}
