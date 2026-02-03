import { useId, useMemo } from 'react';

export default function useOffcanvas() {
  const titleIdentifier = useId();

  return useMemo(
    () => ({
      titleIdentifier,
    }),
    [],
  );
}
