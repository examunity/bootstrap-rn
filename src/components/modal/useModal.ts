import { useId, useMemo } from 'react';

export default function useModal(scrollable: boolean) {
  const identifier = useId();

  return useMemo(
    () => ({
      identifier,
      scrollable,
    }),
    [scrollable],
  );
}
