import Context from '../Context';
import { concatRefs } from '../utils';
import useForcedContext from './useForcedContext';

export default function useModifier(name, props, ref) {
  const context = useForcedContext(Context);

  const useModifierHook = context.modifiers[name];

  if (!useModifier) {
    return [props, ref];
  }

  const { ref: modifierRef, ...modifierProps } = useModifierHook(props);

  return [modifierProps, concatRefs(modifierRef, ref)];
}
