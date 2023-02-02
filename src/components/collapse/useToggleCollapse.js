import useForcedContext from '../../hooks/useForcedContext';
import CollapseContext from './CollapseContext';

export default function useToggleCollapse(props) {
  const context = useForcedContext(CollapseContext);

  const { onPress: handlePress, ...restProps } = props;

  return {
    ...restProps,
    onPress: (event) => {
      if (handlePress) handlePress(event);

      if (!event.defaultPrevented) {
        context.setVisible((value) => !value);
      }
    },
    accessibilityExpanded: context.visible,
    accessibilityControls: context.identifier,
  };
}
