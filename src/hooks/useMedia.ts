import Context from '../Context';
import StyleSheet from '../style/StyleSheet';
import useForcedContext from './useForcedContext';
import type { MediaHandler, Viewport } from '../types';

export default function useMedia(): MediaHandler {
  const context = useForcedContext(Context);

  const viewport = context.getViewport();
  const breakpoints = StyleSheet.value('grid-breakpoints');

  const breakpointKeys = Object.keys(breakpoints);

  return {
    up(point: Viewport) {
      return breakpointKeys.indexOf(viewport) >= breakpointKeys.indexOf(point);
    },
    down(point: Viewport) {
      return breakpointKeys.indexOf(viewport) <= breakpointKeys.indexOf(point);
    },
    only(point: Viewport) {
      return viewport === point;
    },
    between(lower: Viewport, upper: Viewport) {
      return this.up(lower) && this.down(upper);
    },
  };
}
