import { useContext } from 'react';
import Context from '../Context';
import StyleSheet from '../style/StyleSheet';

export default function useMedia() {
  const context = useContext(Context);

  const viewport = context.getViewport();
  const breakpoints = StyleSheet.value('grid-breakpoints');

  const breakpointKeys = Object.keys(breakpoints);

  return {
    up(point) {
      return breakpointKeys.indexOf(viewport) >= breakpointKeys.indexOf(point);
    },
    down(point) {
      return breakpointKeys.indexOf(viewport) <= breakpointKeys.indexOf(point);
    },
    only(point) {
      return viewport === point;
    },
    between(lower, upper) {
      return this.up(lower) && this.down(upper);
    },
  };
}
