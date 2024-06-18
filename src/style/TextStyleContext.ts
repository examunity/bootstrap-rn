import React from 'react';
import type { TextStyle } from '../types';

export type TextStyleContextType = {
  style: TextStyle;
  hasTextAncestor: boolean;
};

const TextStyleContext = React.createContext<TextStyleContextType | null>(null);

TextStyleContext.displayName = 'TextStyleContext';

export default TextStyleContext;
