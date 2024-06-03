import invariant from 'tiny-invariant';
import useForcedContext from '../../hooks/useForcedContext';
import TabContext from './TabContext';
import { getElementId } from '../../utils';

export type useToggleTabProps = {
  target: string;
  onPress?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type ToggleTabResult = {
  id: string;
  onPress: (event: React.MouseEvent<HTMLButtonElement>) => void;
  active: boolean;
  role: string;
  'aria-controls': string;
  'aria-selected': boolean;
};

export default function useToggleTab(
  props: useToggleTabProps,
): ToggleTabResult {
  const context = useForcedContext(TabContext);

  const { target, onPress: handlePress, ...restProps } = props;

  invariant(target, 'Prop "target" is required.');

  const id = getElementId(context.identifier, target);
  const active = context.activeTarget === target;

  return {
    ...restProps,
    id: `${id}-tab`,
    onPress: (event: React.MouseEvent<HTMLButtonElement>) => {
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
