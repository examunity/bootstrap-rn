import type { GestureResponderEvent } from 'react-native';
import invariant from 'tiny-invariant';
import useForcedContext from '../../hooks/useForcedContext';
import TabContext from './TabContext';
import { getElementId } from '../../utils';

export interface UseToggleTabProps {
  target?: string;
  onPress?: null | ((event: GestureResponderEvent) => void);
}

export default function useToggleTab<T>(props: UseToggleTabProps & T) {
  const context = useForcedContext(TabContext);

  const { target, onPress: handlePress, ...restProps } = props;

  invariant(target, 'Prop "target" is required.');

  const id = getElementId(context.identifier, target);
  const active = context.activeTarget === target;

  return {
    ...restProps,
    id: `${id}-tab`,
    onPress: (event: GestureResponderEvent) => {
      if (handlePress) handlePress(event);

      event.preventDefault();
      context.setActiveTarget(target);
    },
    active,
    role: 'tab',
    'aria-controls': id,
    'aria-selected': active,
  };
}
