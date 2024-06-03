import React, { useContext, useMemo } from 'react';
import { ScrollView as BaseScrollView } from 'react-native';
import TextStyleContext from '../style/TextStyleContext';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

export type ScrollViewProps = {
  children?: React.ReactNode;
  style?: unknown;
  contentContainerStyle?: unknown;
  textStyle?: unknown;
  styleName?: string;
};

const ScrollView = React.forwardRef<BaseScrollView, ScrollViewProps>(
  (props, ref) => {
    const {
      children,
      contentContainerStyle,
      style,
      textStyle,
      styleName,
      ...elementProps
    } = props;

    const media = useMedia();
    const context = useContext(TextStyleContext);

    const resolveContentContainerStyle = useStyle(contentContainerStyle);
    const resolveStyle = useStyle(style, styleName);
    const resolveTextStyle = useStyle([context && context.style, textStyle]);

    const hasTextStyle = (context && context.style) || textStyle;

    const contextValue = useMemo(
      () => ({
        style: resolveTextStyle({ media }),
        hasAncestor: context && context.hasTextAncestor,
      }),
      [resolveTextStyle, context, media],
    );

    return (
      <BaseScrollView
        {...elementProps}
        ref={ref}
        contentContainerStyle={resolveContentContainerStyle({ media })}
        style={resolveStyle({ media })}
      >
        {hasTextStyle ? (
          <TextStyleContext.Provider value={contextValue}>
            {children}
          </TextStyleContext.Provider>
        ) : (
          children
        )}
      </BaseScrollView>
    );
  },
);

ScrollView.displayName = 'ScrollView';

export default ScrollView;
