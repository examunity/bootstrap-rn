import React, { useContext, useMemo } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import TextStyleContext from './TextStyleContext';

type TextStyleProviderProps = {
  children: React.ReactNode;
  style: StyleProp<TextStyle>;
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
