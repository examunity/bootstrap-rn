import { concatRefs } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionFunction = <P>(props: P) => any;

type ToggleType =
  | ActionFunction
  | {
      useToggle: ActionFunction;
    };

type DismissType =
  | ActionFunction
  | {
      useDismiss: ActionFunction;
    };

export type ActionProps = {
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

export default function useAction<T, P>(
  props: ActionProps & P,
  ref: React.LegacyRef<T>,
) {
  const { toggle, dismiss, ...restProps } = props;

  const useActionHook = getActionHook(toggle, dismiss);

  if (!useActionHook) {
    return [restProps, ref] as const;
  }

  if (typeof useActionHook !== 'function') {
    throw new Error('Action hook must be of type function.');
  }

  // TODO: Remove as and define return type on ActionFunction
  const { ref: actionRef, ...actionProps } = useActionHook(restProps) as P & {
    ref?: React.LegacyRef<T>;
  };

  return [actionProps, actionRef ? concatRefs(actionRef, ref) : ref] as const;
}
