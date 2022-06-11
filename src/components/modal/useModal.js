import { useMemo } from 'react';

export default function useModal(scrollable) {
  return useMemo(
    () => ({
      scrollable,
    }),
    [scrollable],
  );
}
