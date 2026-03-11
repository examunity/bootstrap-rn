import { useMemo } from 'react';

export default function useScrollbarEffects() {
  return useMemo(
    () => ({
      hide() {},
      show() {},
      subscribe() {
        return () => {};
      },
      getOffset() {
        return 0;
      },
    }),
    [],
  );
}
