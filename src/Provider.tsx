import React, { useMemo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useViewport from './hooks/useViewport';
import useScrollbarEffects from './hooks/useScrollbarEffects';
import Context, { Modifiers } from './Context';
import type { ExtendedStyle, Viewport } from './types';

type ProviderProps = {
  children: React.ReactNode;
  utilities?: Record<string, ExtendedStyle>;
  modifiers?: Modifiers;
  ssrViewport: Viewport;
};

function Provider({
  children,
  utilities = {},
  modifiers = {},
  ssrViewport,
}: ProviderProps) {
  const viewport = useViewport(ssrViewport);

  const scrollbar = useScrollbarEffects();

  const context = useMemo(
    () => ({
      utilities,
      modifiers,
      scrollbar,
      getViewport() {
        return viewport;
      },
    }),
    [utilities, modifiers, scrollbar, viewport],
  );

  return (
    <Context.Provider value={context}>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </Context.Provider>
  );
}

export default Provider;
