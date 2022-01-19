import { useMemo } from 'react';
import { useFloating, shift } from '@floating-ui/react-native';
import useIdentifier from '../../hooks/useIdentifier';
import useControlledState from '../../hooks/useControlledState';

export default function useDropdown(
  placement,
  defaultVisible,
  controlledVisible,
  onToggle,
) {
  const identifier = useIdentifier('dropdown');

  const {
    x = 0,
    y = 0,
    reference: triggerRef,
    floating: menuRef,
  } = useFloating({
    placement,
    middleware: [shift()],
  });

  const [visible, setVisible] = useControlledState(
    defaultVisible,
    controlledVisible,
    onToggle,
  );

  return useMemo(
    () => ({
      identifier,
      visible,
      setVisible,
      triggerRef,
      menuRef,
      menuPos: { x, y },
    }),
    [visible, x, y],
  );
}
