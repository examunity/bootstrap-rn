import React from 'react';
import type { ExtendedTextStyle, StyleProp } from '../types';

export type TextStyleContextType = {
  style: StyleProp<ExtendedTextStyle>;
  hasTextAncestor?: boolean;
};

const TextStyleContext = React.createContext<TextStyleContextType | null>(null);

TextStyleContext.displayName = 'TextStyleContext';

export default TextStyleContext;
