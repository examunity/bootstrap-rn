import Context from '../Context';
import { concatRefs } from '../utils';
import useForcedContext from './useForcedContext';

export default function useModifier<R, T>(
  name: string,
  props: T,
  ref: React.Ref<R>,
): [Omit<T, 'ref'>, React.Ref<R>] {
  const context = useForcedContext(Context);

  const useModifierHook = context.modifiers[name];

  if (!useModifier) {
    return [props, ref];
  }

  const { ref: modifierRef, ...modifierProps } = useModifierHook(props, ref);

  return [modifierProps, modifierRef ? concatRefs(modifierRef, ref) : ref];
}
