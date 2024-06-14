import { useState, useEffect } from 'react';
import { Dimensions, Platform, ScaledSize } from 'react-native';
import StyleSheet from '../style/StyleSheet';

interface Breakpoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

type Viewport = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

type DimensionType = { window: ScaledSize };

const calculateViewport = (breakpoints: Breakpoints, width: number) => {
  if (width < breakpoints.sm) {
    return 'xs';
  }
  if (width < breakpoints.md) {
    return 'sm';
  }
  if (width < breakpoints.lg) {
    return 'md';
  }
  if (width < breakpoints.xl) {
    return 'lg';
  }
  if (width < breakpoints.xxl) {
    return 'xl';
  }
  return 'xxl';
};

const getWidth = (dimensions: DimensionType) => {
  // Use web api on web because of issue #38:
  // https://github.com/examunity/bootstrap-rn/issues/38
  if (Platform.OS === 'web') {
    return Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0,
    );
  }

  return dimensions.window.width;
};

export default function useViewport(initialViewport: Viewport) {
  const [viewport, setViewport] = useState(initialViewport);
  const breakpoints = StyleSheet.value('grid-breakpoints');

  const handleChange = (dimensions: DimensionType) => {
    const width = getWidth(dimensions);
    const nextViewport = calculateViewport(breakpoints, width);

    setViewport(nextViewport);
  };

  useEffect(() => {
    // Initially determine viewport after mounting.
    handleChange({ window: Dimensions.get('window') });

    const subscription = Dimensions.addEventListener('change', handleChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return viewport;
}
