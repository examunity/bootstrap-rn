import { concatRefs } from '../utils';

type ToggleFunction = <T>(
  props: Omit<T, 'toggle' | 'dismiss'>,
) => T & { ref?: React.LegacyRef<unknown> };

type ToggleType =
  | ToggleFunction
  | {
      useToggle: ToggleFunction;
    };

type DismissFunction = <T>(
  props: Omit<T, 'toggle' | 'dismiss'>,
) => T & { ref?: React.LegacyRef<unknown> };

type DismissType =
  | DismissFunction
  | {
      useDismiss: DismissFunction;
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
  props: {
    toggle?: ToggleType;
    dismiss?: DismissType;
  } & P,
  ref: React.LegacyRef<T>,
): [Omit<P, 'ref'>, React.LegacyRef<T>] {
  const { toggle, dismiss, ...restProps } = props;

  const useActionHook = getActionHook(toggle, dismiss);

  if (!useActionHook) {
    return [props, ref];
  }

  if (typeof useActionHook !== 'function') {
    throw new Error('Action hook must be of type function.');
  }

  const { ref: actionRef, ...actionProps } = useActionHook(restProps);

  return [actionProps, actionRef ? concatRefs(actionRef, ref) : ref];
}
