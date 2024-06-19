import React from 'react';
import { View as BaseView } from 'react-native';
import type { ExtendedStyle, Viewport, Modifier } from './types';

export type BootstrapRNContextType = {
  utilities: Record<string, ExtendedStyle>;
  modifiers: Record<string, Modifier>;
  scrollbars: {
    hide: () => void;
    show: () => void;
  };
  fixed: React.RefObject<BaseView>[];
  getViewport(): Viewport;
  addFixedElement: (ref: unknown) => {
    remove: () => void;
  };
  generateKey(prefix: string): string;
};

const Context = React.createContext<BootstrapRNContextType | null>(null);

Context.displayName = 'BootstrapRNContext';

export default Context;
