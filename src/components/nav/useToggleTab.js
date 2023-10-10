import invariant from 'tiny-invariant';
import useForcedContext from '../../hooks/useForcedContext';
import TabContext from './TabContext';
import { getElementId } from '../../utils';

export default function useToggleTab(props) {
  const context = useForcedContext(TabContext);

  const { target, onPress: handlePress, ...restProps } = props;

  invariant(target, 'Prop "target" is required.');

  const id = getElementId(context.identifier, target);
  const active = context.activeTarget === target;

  return {
    ...restProps,
    id: `${id}-tab`,
    onPress: (event) => {
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
