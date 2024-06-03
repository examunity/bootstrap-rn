import { MouseEvent } from 'react';
import useForcedContext from '../../hooks/useForcedContext';
import NavbarContext from './NavbarContext';

interface useDismissNavbarProps {
  onPress?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function useDismissNavbar(props: useDismissNavbarProps) {
  const context = useForcedContext(NavbarContext);

  const { onPress: handlePress, ...restProps } = props;

  return {
    ...restProps,
    onPress: (event: MouseEvent<HTMLButtonElement>) => {
      if (handlePress) handlePress(event);

      context.setExpanded(false);
    },
    'aria-label': 'Close',
  };
}
