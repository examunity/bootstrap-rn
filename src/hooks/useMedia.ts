import { useContext } from 'react';
import Context from '../Context';
import StyleSheet from '../style/StyleSheet';

export type useMediaProps = {
  up: (point: string) => boolean;
  down: (point: string) => boolean;
  only: (point: string) => boolean;
  between: (lower: string, upper: string) => boolean;
};

export default function useMedia(): useMediaProps {
  const context = useContext(Context);

  const viewport = context.getViewport();
  const breakpoints = StyleSheet.value('grid-breakpoints');

  const breakpointKeys = Object.keys(breakpoints);

  return {
    up(point: string) {
      return breakpointKeys.indexOf(viewport) >= breakpointKeys.indexOf(point);
    },
    down(point: string) {
      return breakpointKeys.indexOf(viewport) <= breakpointKeys.indexOf(point);
    },
    only(point: string) {
      return viewport === point;
    },
    between(lower: string, upper: string) {
      return this.up(lower) && this.down(upper);
    },
  };
}
