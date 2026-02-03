import { useId, useMemo } from 'react';

export default function useModal(scrollable: boolean) {
  const titleIdentifier = useId();

  return useMemo(
    () => ({
      titleIdentifier,
      scrollable,
    }),
    [scrollable],
  );
}
