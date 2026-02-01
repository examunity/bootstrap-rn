import React, { useMemo, useRef } from 'react';
import { View as BaseView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalHost } from '@rn-primitives/portal';
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

  const fixed: React.RefObject<BaseView>[] = useMemo(() => [], []);

  const counter = useRef(0);

  const scrollbars = useScrollbarEffects(fixed);

  const context = useMemo(
    () => ({
      utilities,
      modifiers,
      scrollbars,
      fixed,
      getViewport() {
        return viewport;
      },
      addFixedElement(ref: React.RefObject<BaseView>) {
        fixed.push(ref);

        return {
          remove() {
            const index = fixed.findIndex((item) => item === ref);

            fixed.splice(index, 1);
          },
        };
      },
    }),
    [utilities, modifiers, scrollbars, fixed, viewport, fixed, counter],
  );

  return (
    <Context.Provider value={context}>
      <SafeAreaProvider>
        {children}
        <PortalHost />
      </SafeAreaProvider>
    </Context.Provider>
  );
}

export default Provider;
