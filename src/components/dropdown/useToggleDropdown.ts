import { MouseEvent } from 'react';
import useForcedContext from '../../hooks/useForcedContext';
import DropdownContext from './DropdownContext';

export type UseToggleDropdownProps = {
  onPress?: (event: MouseEvent<HTMLButtonElement>) => void;
  caret?: { direction?: string } | boolean;
};

export default function useToggleDropdown(props: UseToggleDropdownProps) {
  const context = useForcedContext(DropdownContext);

  const { onPress: handlePress, caret, ...restProps } = props;

  return {
    ...restProps,
    id: context.identifier,
    ref: context.toggleRef,
    onPress: (event: MouseEvent<HTMLButtonElement>) => {
      if (handlePress) handlePress(event);

      context.setVisible(!context.visible);
    },
    'aria-haspopup': true,
    'aria-expanded': context.visible,
    active: context.visible,
    caret: caret === undefined ? { direction: context.direction } : caret,
  };
}
