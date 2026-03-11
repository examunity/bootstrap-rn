import { useRef, useMemo } from 'react';

type ScrollbarEffectsState = {
  counter: number;
  offset: number;
  listeners: Set<() => void>;
  originalBodyWidth: string;
  originalBodyOverflow: string;
};

const computeScrollbarWidth = () => {
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
};

export default function useScrollbarEffects() {
  const state = useRef<ScrollbarEffectsState>({
    counter: 0,
    offset: 0,
    listeners: new Set(),
    originalBodyWidth: '',
    originalBodyOverflow: '',
  });

  return useMemo(
    () => ({
      hide() {
        state.current.counter += 1;

        if (state.current.counter !== 1) {
          return;
        }

        const rect = document.body.getBoundingClientRect();
        const isBodyOverflowing = rect.left + rect.right < window.innerWidth;

        state.current.originalBodyWidth = document.body.style.width || '';
        state.current.originalBodyOverflow = document.body.style.overflow || '';

        if (isBodyOverflowing) {
          const scrollbarWidth = computeScrollbarWidth();

          document.body.style.width = `calc(100% - ${scrollbarWidth}px)`;
          state.current.offset = scrollbarWidth;
          state.current.listeners.forEach((listener) => listener());
        }

        // Add "overflow: hidden" to body element.
        document.body.style.overflow = 'hidden';
      },
      show() {
        state.current.counter -= 1;

        if (state.current.counter !== 0) {
          return;
        }

        // Remove "overflow: hidden" from body element.
        document.body.style.overflow = state.current.originalBodyOverflow;

        // Reset body width adjustment.
        document.body.style.width = state.current.originalBodyWidth;
        state.current.offset = 0;
        state.current.listeners.forEach((listener) => listener());
      },
      subscribe(listener: () => void) {
        state.current.listeners.add(listener);

        return () => {
          state.current.listeners.delete(listener);
        };
      },
      getOffset() {
        return state.current.offset;
      },
    }),
    [],
  );
}
