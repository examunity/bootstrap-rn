import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';

export type TextStyleContextType = {
  style: StyleProp<TextStyle>;
  hasTextAncestor?: boolean;
};

const TextStyleContext = React.createContext<TextStyleContextType | null>(null);

TextStyleContext.displayName = 'TextStyleContext';

export default TextStyleContext;
