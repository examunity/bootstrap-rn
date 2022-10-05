import { useRef, useEffect, useContext } from 'react';
import { Platform, findNodeHandle } from 'react-native';
import Context from '../Context';

const computeScrollbarWidth = () => {
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
};

export default function useScrollbarEffects({ keepBodyScroll, visible }) {
  if (Platform.OS !== 'web' || keepBodyScroll) {
    return;
  }

  const context = useContext(Context);

  const scrollbarWidth = useRef();

  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    if (!scrollbarWidth.current) {
      scrollbarWidth.current = computeScrollbarWidth();
    }

    const rect = document.body.getBoundingClientRect();
    const isBodyOverflowing = rect.left + rect.right < window.innerWidth;

    // Set body and fixed elements padding adjustments.
    const fixedElements = context.fixed
      .filter((ref) => ref.current)
      .map((ref) => findNodeHandle(ref.current));
    const elements = [document.body, ...fixedElements];

    const originalWidths = elements.map((el) => el.style.width || '');

    const originalBodyOverflow = document.body.style.overflow || '';

    if (isBodyOverflowing) {
      elements.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        el.style.width = `calc(100% - ${scrollbarWidth.current}px)`;
      });
    }

    // Add "overflow: hidden" to body element.
    document.body.style.overflow = 'hidden';

    return () => {
      // Reset body padding adjustments.
      elements.forEach((el, key) => {
        // eslint-disable-next-line no-param-reassign
        el.style.width = originalWidths[key] || '';
      });

      // Remove "overflow: hidden" from body element.
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [visible]);
}
