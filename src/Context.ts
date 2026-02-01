import React from 'react';
import { View as BaseView } from 'react-native';
import type { ExtendedStyle, Viewport } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ModifierProps = any;

export type Modifier = (
  props: ModifierProps,
  ref: React.Ref<unknown>,
) => ModifierProps & { ref?: React.Ref<unknown> };

export type Modifiers = {
  useFormField?: Modifier;
  useTabbable?: Modifier;
  useActionable?: Modifier;
};

export type BootstrapRNContextType = {
  utilities: Record<string, ExtendedStyle>;
  modifiers: Modifiers;
  scrollbars: {
    hide: () => void;
    show: () => void;
  };
  fixed: React.RefObject<BaseView>[];
  getViewport(): Viewport;
  addFixedElement: (ref: unknown) => {
    remove: () => void;
  };
};

const Context = React.createContext<BootstrapRNContextType | null>(null);

Context.displayName = 'BootstrapRNContext';

export default Context;
