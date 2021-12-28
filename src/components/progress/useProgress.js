import { useMemo } from 'react';

export default function useProgress(min, max) {
  return useMemo(
    () => ({
      min,
      max,
    }),
    [min, max],
  );
}
