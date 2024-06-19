import React, { useMemo, useRef } from 'react';
import { View as BaseView } from 'react-native';
import { OverlayProvider } from '@react-native-aria/overlays';
import useViewport from './hooks/useViewport';
import useScrollbarEffects from './hooks/useScrollbarEffects';
import Context from './Context';
import type { ExtendedStyle, Viewport, Modifier } from './types';

type ProviderProps = {
  children: React.ReactNode;
  utilities: Record<string, ExtendedStyle>;
  modifiers: Record<string, Modifier>;
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
      generateKey(prefix: string) {
        counter.current += 1;

        return `ui-${prefix}-${counter.current}`;
      },
    }),
    [utilities, modifiers, scrollbars, fixed, viewport, fixed, counter],
  );

  return (
    <Context.Provider value={context}>
      <OverlayProvider>{children}</OverlayProvider>
    </Context.Provider>
  );
}

export default Provider;
