import Context, { Modifiers } from '../Context';
import { concatRefs } from '../utils';
import useForcedContext from './useForcedContext';

export default function useModifier<T extends { ref?: React.Ref<unknown> }>(
  name: keyof Modifiers,
  props: T,
): T {
  const context = useForcedContext(Context);

  const useModifierHook = context.modifiers[name];

  if (!useModifierHook) {
    return props;
  }

  const { ref: modifierRef, ...modifierProps } = useModifierHook(props);

  return {
    ...modifierProps,
    ref: modifierRef ? concatRefs(modifierRef, props.ref) : props.ref,
  } as T;
}
