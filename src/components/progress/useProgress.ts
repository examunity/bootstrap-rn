import { useMemo } from 'react';

export default function useProgress(min: number, max: number) {
  return useMemo(
    () => ({
      min,
      max,
    }),
    [min, max],
  );
}
