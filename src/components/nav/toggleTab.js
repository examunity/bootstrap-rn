import invariant from 'tiny-invariant';
import { BOOTSTYLE_ACTION } from '../../symbols';
import TabContext from './TabContext';
import { concatFns, getElementId } from '../../utils';

const toggleTab = {
  $$typeof: BOOTSTYLE_ACTION,
  handle: (props, context) => {
    const { target, onPress: handlePress, ...restProps } = props;

    invariant(target, 'Prop "target" is required.');

    const id = getElementId(context.identifier, target);
    const active = context.activeTarget === target;

    return {
      ...restProps,
      nativeID: `${id}-tab`,
      onPress: concatFns((event) => {
        event.preventDefault();
        context.setActiveTarget(target);
      }, handlePress),
      active,
      accessibilityRole: 'tab',
      accessibilityControls: id,
      accessibilitySelected: active,
    };
  },
  context: TabContext,
};

export default toggleTab;
