import useForcedContext from '../../hooks/useForcedContext';
import DropdownContext from './DropdownContext';

export default function useDismissDropdown(props) {
  const context = useForcedContext(DropdownContext);

  const { onPress: handlePress, ...restProps } = props;

  return {
    ...restProps,
    onPress: (event) => {
      if (handlePress) handlePress(event);
      context.setExpanded(false);
    },
  };
}
