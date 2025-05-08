import { useRef, useMemo, RefObject } from 'react';
import { Platform } from 'react-native';
import type { ViewRef } from '../components/View';

type ScrollbarEffectsState = {
  counter: number;
  elements: HTMLElement[];
  originalWidths: string[];
  originalBodyOverflow: string;
};

const computeScrollbarWidth = () => {
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
};

export default function useScrollbarEffects(
  elements: RefObject<ViewRef | null>[],
) {
  if (Platform.OS !== 'web') {
    return useMemo(
      () => ({
        hide() {},
        show() {},
      }),
      [],
    );
  }

  const state = useRef<ScrollbarEffectsState>({
    counter: 0,
    elements: [],
    originalWidths: [],
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

        // Set body and fixed elements padding adjustments.
        const fixedElements = elements
          .filter((ref) => ref.current)
          .map((ref) => ref.current);

        // @ts-expect-error fixedElements should be of type HTMLElement[]
        state.current.elements = [document.body, ...fixedElements];

        state.current.originalWidths = state.current.elements.map(
          (el) => el.style.width || '',
        );

        state.current.originalBodyOverflow = document.body.style.overflow || '';

        if (isBodyOverflowing) {
          const scrollbarWidth = computeScrollbarWidth();

          state.current.elements.forEach((el) => {
            // eslint-disable-next-line no-param-reassign
            el.style.width = `calc(100% - ${scrollbarWidth}px)`;
          });
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

        // Reset body padding adjustments.
        state.current.elements.forEach((el, key) => {
          // eslint-disable-next-line no-param-reassign
          el.style.width = state.current.originalWidths[key] || '';
        });
      },
    }),
    [],
  );
}
