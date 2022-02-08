import { useContext } from 'react';
import invariant from 'tiny-invariant';

export default function useForcedContext(Context) {
  const context = useContext(Context);

  invariant(context, `Failed to get context "${Context.displayName}".`);

  return context;
}
