import React, { useContext, useMemo } from 'react';
import TextStyleContext from './TextStyleContext';
import type { StyleProp, ExtendedTextStyle } from '../types';

type TextStyleProviderProps = {
  children: React.ReactNode;
  style?: StyleProp<ExtendedTextStyle>;
};

function TextStyleProvider(props: TextStyleProviderProps) {
  const { children, style } = props;

  const parentContext = useContext(TextStyleContext);

  const contextValue = useMemo(
    () => ({
      style: parentContext ? [parentContext.style, style] : style,
      hasTextAncestor: !!(parentContext && parentContext.hasTextAncestor),
    }),
    [parentContext, style],
  );

  return (
    <TextStyleContext.Provider value={contextValue}>
      {children}
    </TextStyleContext.Provider>
  );
}

export default TextStyleProvider;
