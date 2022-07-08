import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import StyleSheet from '../style/StyleSheet';

export default function useViewport(initialViewport) {
  const [viewport, setViewport] = useState(initialViewport);
  const breakpoints = StyleSheet.value('grid-breakpoints');

  const calculateViewport = (width) => {
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
    return 'xl';
  };

  const handleChange = (dimensions) => {
    const nextViewport = calculateViewport(dimensions.window.width);

    if (viewport !== nextViewport) {
      setViewport(nextViewport);
    }
  };

  // Initially determine viewport after mounting.
  useEffect(() => {
    handleChange({ window: Dimensions.get('window') });
  }, []);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', handleChange);

    return () => {
      subscription.remove();
    };
  }, [viewport]);

  return viewport;
}
