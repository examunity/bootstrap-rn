import type { UseToggleButtonProps } from '../components/buttons/useToggleButton';
import type { UseToggleCollapseProps } from '../components/collapse/useToggleCollapse';
import type { UseDismissDropdownProps } from '../components/dropdown/useDismissDropdown';
import type { UseToggleDropdownProps } from '../components/dropdown/useToggleDropdown';
import type { UseToggleTabProps } from '../components/nav/useToggleTab';
import type { UseDismissNavbarProps } from '../components/navbar/useDismissNavbar';
import type { UseToggleNavbarProps } from '../components/navbar/useToggleNavbar';
import { concatRefs } from '../utils';

interface UseToggleProps
  extends
    UseToggleTabProps,
    UseToggleNavbarProps,
    UseToggleButtonProps,
    UseToggleCollapseProps,
    UseToggleDropdownProps {}

interface UseDismissProps
  extends UseDismissDropdownProps, UseDismissNavbarProps {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ToggleFunction = <T>(props: T & UseToggleProps) => any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DismissFunction = <T>(props: T & UseDismissProps) => any;

type ToggleType =
  | ToggleFunction
  | {
      useToggle: ToggleFunction;
    };

type DismissType =
  | DismissFunction
  | {
      useDismiss: DismissFunction;
    };

export interface UseActionProps extends UseToggleProps, UseDismissProps {
  toggle?: ToggleType;
  dismiss?: DismissType;
}

function getActionHook(toggle?: ToggleType, dismiss?: DismissType) {
  if (toggle) {
    if (typeof toggle !== 'function') return toggle.useToggle;
    if ('useToggle' in toggle) return toggle.useToggle;
    return toggle;
  }

  if (dismiss) {
    if (typeof dismiss !== 'function') return dismiss.useDismiss;
    if ('useDismiss' in dismiss) return dismiss.useDismiss;
    return dismiss;
  }

  return null;
}

export default function useAction<P extends { ref?: React.Ref<unknown> }>(
  props: UseActionProps & P,
) {
  const { toggle, dismiss, ...restProps } = props;

  const useActionHook = getActionHook(toggle, dismiss);

  if (!useActionHook) {
    return restProps as Omit<P, 'toggle' | 'dismiss'>;
  }

  if (typeof useActionHook !== 'function') {
    throw new Error('Action hook must be of type function.');
  }

  // TODO: Remove as and define return type on ActionFunction
  const { ref: actionRef, ...actionProps } = useActionHook(restProps) as P & {
    ref?: React.Ref<unknown>;
  };

  return {
    ...actionProps,
    ref: actionRef ? concatRefs(actionRef, props.ref) : props.ref,
  } as unknown as Omit<P, 'toggle' | 'dismiss'>;
}
