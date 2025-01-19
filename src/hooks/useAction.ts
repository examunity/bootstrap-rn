import type { UseToggleButtonProps } from '../components/buttons/useToggleButton';
import type { UseToggleCollapseProps } from '../components/collapse/useToggleCollapse';
import type { UseDismissDropdownProps } from '../components/dropdown/useDismissDropdown';
import type { UseToggleDropdownProps } from '../components/dropdown/useToggleDropdown';
import type { UseToggleTabProps } from '../components/nav/useToggleTab';
import type { UseDismissNavbarProps } from '../components/navbar/useDismissNavbar';
import type { UseToggleNavbarProps } from '../components/navbar/useToggleNavbar';
import { concatRefs } from '../utils';

interface UseToggleProps
  extends UseToggleTabProps,
    UseToggleNavbarProps,
    UseToggleButtonProps,
    UseToggleCollapseProps,
    UseToggleDropdownProps {}

interface UseDismissProps
  extends UseDismissDropdownProps,
    UseDismissNavbarProps {}

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
    return typeof toggle === 'function' ? toggle : toggle.useToggle;
  }

  if (dismiss) {
    return typeof dismiss === 'function' ? dismiss : dismiss.useDismiss;
  }

  return null;
}

export default function useAction<T, P>(
  props: UseActionProps & P,
  ref: React.Ref<T>,
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
    ref?: React.Ref<T>;
  };

  return [actionProps, actionRef ? concatRefs(actionRef, ref) : ref] as const;
}
