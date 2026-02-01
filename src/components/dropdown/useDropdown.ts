import { useMemo, useState } from 'react';
import StyleSheet from '../../style/StyleSheet';
import type { DropdownDirection } from './DropdownContext';
import type { OverlayAlignment } from '../../types';
import useOverlay from '../../hooks/useOverlay';
import { normalizeNumber } from '../../style/math';

const getPlacement = (direction: DropdownDirection) => {
  if (direction === 'up') {
    return 'top';
  }

  if (direction === 'down') {
    return 'bottom';
  }

  return direction;
};

export default function useDropdown(
  defaultVisible: boolean,
  controlledVisible: boolean | undefined,
  onToggle: () => void,
  direction: DropdownDirection,
  center: boolean,
  display: string,
) {
  const [align, setAlign] = useState<OverlayAlignment | null>(null);

  const offset = normalizeNumber(StyleSheet.value('dropdown-spacer'));

  const { identifier, visible, setVisible, trigger, content } = useOverlay({
    defaultVisible,
    controlledVisible,
    onToggle,
    offset,
    align: center ? 'center' : align || 'start',
    placement: getPlacement(direction),
  });

  return useMemo(
    () => ({
      identifier,
      visible,
      setVisible,
      align,
      setAlign,
      direction,
      display,
      trigger,
      content,
    }),
    [visible, align, direction, display, trigger, content],
  );
}
