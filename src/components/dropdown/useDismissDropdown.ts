import { useCallback } from 'react';
import useForcedContext from '../../hooks/useForcedContext';
import DropdownContext from './DropdownContext';

type useDismissDropdownProps = {
  onPress?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const useDismissDropdown = (props: useDismissDropdownProps) => {
  const context = useForcedContext(DropdownContext);

  const handlePress = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onPress) props.onPress(event);
      context.setVisible(false);
    },
    [context, props.onPress],
  );

  const { ...restProps } = props;

  return {
    ...restProps,
    onPress: handlePress,
  };
};

export default useDismissDropdown;
