import { concatRefs } from '../utils';

export type ToggleType = {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  useToggle?: (props?: unknown) => any;
};

type DismissType = {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  useDismiss?: (props?: unknown) => any;
};

export type UseActionProps = {
  toggle?: ToggleType;
  dismiss?: DismissType;
};

function getActionHook(toggle?: ToggleType, dismiss?: DismissType) {
  if (toggle) {
    return typeof toggle === 'function' ? toggle : toggle.useToggle;
  }

  if (dismiss) {
    return typeof dismiss === 'function' ? dismiss : dismiss.useDismiss;
  }

  return null;
}

export default function useAction(
  props: UseActionProps,
  ref: React.Ref<unknown>,
) {
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
