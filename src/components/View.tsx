import React, { useContext, useMemo } from 'react';
import { View as BaseView } from 'react-native';
import TextStyleContext from '../style/TextStyleContext';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

export type ViewProps = {
  children?: React.ReactNode;
  style?: any;
  textStyle?: any;
  styleName?: any;
  [key: string]: any;
};

const View = React.forwardRef<any, ViewProps>((props, ref) => {
  const { children, style, textStyle, styleName, ...elementProps } = props;

  const media = useMedia();
  const context = useContext(TextStyleContext);

  const resolveStyle = useStyle(style, styleName);
  const resolveTextStyle = useStyle([context?.style, textStyle]);

  const hasTextStyle = context?.style || textStyle;

  const contextValue = useMemo(
    () => ({
      style: resolveTextStyle({ media }),
      hasAncestor: context?.hasTextAncestor,
    }),
    [resolveTextStyle, media, context],
  );

  return (
    <BaseView {...elementProps} ref={ref} style={resolveStyle({ media })}>
      {hasTextStyle ? (
        <TextStyleContext.Provider value={contextValue}>
          {children}
        </TextStyleContext.Provider>
      ) : (
        children
      )}
    </BaseView>
  );
});

View.displayName = 'View';

export default View;
