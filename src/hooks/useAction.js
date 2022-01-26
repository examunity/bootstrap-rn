import invariant from 'tiny-invariant';
import useForcedContext from './useForcedContext';
import { BOOTSTYLE_ACTION } from '../symbols';
import { concatRefs } from '../utils';

const getAction = (toggle, dismiss) => {
  if (toggle) {
    const action = toggle.toggle || toggle;
    invariant(
      action.$$typeof === BOOTSTYLE_ACTION,
      'Prop "toggle" is set, but no action found.',
    );
    return action;
  }

  if (dismiss) {
    const action = dismiss.dismiss || dismiss;
    invariant(
      action.$$typeof === BOOTSTYLE_ACTION,
      'Prop "dismiss" is set, but no action found.',
    );
    return action;
  }

  return null;
};

export default function useAction(props, ref) {
  const { toggle, dismiss, ...restProps } = props;

  const action = getAction(toggle, dismiss);

  if (!action) {
    return [props, ref];
  }

  const context = useForcedContext(action.context);

  const { ref: actionRef, ...actionProps } = action.handle(props, context);

  return [{ ...restProps, ...actionProps }, concatRefs(actionRef, ref)];
}
