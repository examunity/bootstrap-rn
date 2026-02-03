import { useMemo, RefObject } from 'react';
import type { ViewRef } from '../components/View';

export default function useScrollbarEffects(
  // @ts-expect-error Argument elements is used on the web only.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  elements: RefObject<ViewRef | null>[],
) {
  return useMemo(
    () => ({
      hide() {},
      show() {},
    }),
    [],
  );
}
