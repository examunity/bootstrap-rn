import React, { ForwardedRef, useContext, useMemo } from 'react';
import { View as BaseView, ViewProps as BaseViewProps } from 'react-native';
import TextStyleContext from '../style/TextStyleContext';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';
import type {
  ExtendedTextStyle,
  StyleName,
  StyleProp,
  ExtendedViewStyle,
} from '../types';

export interface ViewProps extends Omit<BaseViewProps, 'style'> {
  style?: StyleProp<ExtendedViewStyle>;
  textStyle?: StyleProp<ExtendedTextStyle>;
  styleName?: StyleName;
}

const View = React.forwardRef<BaseView, ViewProps>(
  (props, ref: ForwardedRef<BaseView>) => {
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
  },
);

View.displayName = 'View';

export default View;
