import { useContext, Context } from 'react';
import invariant from 'tiny-invariant';

export default function useForcedContext<T>(ForcedContext: Context<T>) {
  const context = useContext(ForcedContext);

  invariant(
    context,
    `Failed to get context "${ForcedContext.displayName || 'Unknown Context'}".`,
  );

  return context;
}
