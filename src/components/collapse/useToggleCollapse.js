import useForcedContext from '../../hooks/useForcedContext';
import CollapseContext from './CollapseContext';

export default function useToggleCollapse(props) {
  const context = useForcedContext(CollapseContext);

  const { onPress: handlePress, ...restProps } = props;

  return {
    ...restProps,
    onPress: (event) => {
      if (handlePress) handlePress(event);

      context.setVisible((value) => !value);
    },
    'aria-expanded': context.visible,
    'aria-controls': context.identifier,
  };
}
