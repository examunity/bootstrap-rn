import useForcedContext from '../../hooks/useForcedContext';
import CollapseContext from './CollapseContext';

// Define the props expected by the hook
interface ToggleCollapseProps {
  onPress?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function useToggleCollapse(props: ToggleCollapseProps) {
  const context = useForcedContext(CollapseContext);

  const { onPress: handlePress, ...restProps } = props;

  return {
    ...restProps,
    onPress: (event: React.MouseEvent<HTMLButtonElement>) => {
      handlePress?.(event);

      context.setVisible((value: boolean) => !value);
    },
    'aria-expanded': context.visible,
    'aria-controls': context.identifier,
  };
}
