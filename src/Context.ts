import React from 'react';
import type { ExtendedStyle, Viewport } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ModifierProps = any;

export type Modifier = (
  props: ModifierProps,
) => ModifierProps & React.RefAttributes<unknown>;

export type Modifiers = {
  useFormField?: Modifier;
  useTabbable?: Modifier;
  useActionable?: Modifier;
};

export type BootstrapRNContextType = {
  utilities: Record<string, ExtendedStyle>;
  modifiers: Modifiers;
  scrollbar: {
    hide: () => void;
    show: () => void;
    subscribe: (listener: () => void) => () => void;
    getOffset: () => number;
  };
  getViewport(): Viewport;
};

const Context = React.createContext<BootstrapRNContextType | null>(null);

Context.displayName = 'BootstrapRNContext';

export default Context;
