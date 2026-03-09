import { useId, useMemo } from 'react';

export default function useOffcanvas() {
  const identifier = useId();

  return useMemo(
    () => ({
      identifier,
    }),
    [],
  );
}
