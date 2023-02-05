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
    nativeID: `${id}-tab`,
    onPress: (event) => {
      if (handlePress) handlePress(event);

      event.preventDefault();
      context.setActiveTarget(target);
    },
    active,
    accessibilityRole: 'tab',
    accessibilityControls: id,
    accessibilitySelected: active,
  };
}
