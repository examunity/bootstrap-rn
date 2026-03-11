import { useSyncExternalStore } from 'react';
import Context from '../Context';
import useForcedContext from './useForcedContext';

export default function useScrollbarOffset() {
  const context = useForcedContext(Context);

  return useSyncExternalStore(
    context.scrollbar.subscribe,
    context.scrollbar.getOffset,
  );
}
