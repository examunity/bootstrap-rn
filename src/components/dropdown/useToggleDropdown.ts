import type { GestureResponderEvent } from 'react-native';
import useForcedContext from '../../hooks/useForcedContext';
import DropdownContext from './DropdownContext';
import { concatRefs } from '../../utils';
import { CaretProps } from '../Caret';
import type { PressableRef } from '../Pressable';

export interface UseToggleDropdownProps {
  onPress?: null | ((event: GestureResponderEvent) => void);
  caret?: boolean | CaretProps;
}

export default function useToggleDropdown<
  T extends { ref?: React.Ref<PressableRef> },
>(props: UseToggleDropdownProps & T) {
  const context = useForcedContext(DropdownContext);

  const { ref, caret, ...restProps } = props;

  return {
    ...restProps,
    ...context.trigger.getProps(restProps),
    id: context.identifier,
    ref: concatRefs(ref, context.trigger.ref),
    'aria-haspopup': true,
    'aria-expanded': context.visible,
    active: context.visible,
    caret: caret === undefined ? { direction: context.direction } : caret,
  };
}
