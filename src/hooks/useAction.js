import { concatRefs } from '../utils';

const getActionHook = (toggle, dismiss) => {
  if (toggle) {
    return toggle.useToggle || toggle;
  }

  if (dismiss) {
    return dismiss.useDismiss || dismiss;
  }

  return null;
};

export default function useAction(props, ref) {
  const { toggle, dismiss, ...restProps } = props;

  const useActionHook = getActionHook(toggle, dismiss);

  if (!useActionHook) {
    return [props, ref];
  }

  if (typeof useActionHook !== 'function') {
    throw new Error('Action hook must be of type function.');
  }

  const { ref: actionRef, ...actionProps } = useActionHook(restProps);

  return [actionProps, concatRefs(actionRef, ref)];
}
