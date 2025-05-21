import React, { useMemo } from 'react';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import { getStyles } from '../utils';
import TextStyleContext from '../style/TextStyleContext';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';
import SafeAreaView, {
  SafeAreaViewProps,
  SafeAreaViewRef,
} from './SafeAreaView';

export interface BodyProps extends SafeAreaViewProps {}

const styles = StyleSheet.create({
  body: css`
    background-color: $body-bg;
    flex-grow: 1; // added for bootstrap-rn
    flex-shrink: 1; // added for bootstrap-rn
  `,
  'body --text': css`
    color: $body-color;
    text-align: $body-text-align;
  `,
});

const Body = React.forwardRef<SafeAreaViewRef, BodyProps>((props, ref) => {
  const {
    children,
    edges = ['top', 'left', 'right'],
    style,
    textStyle,
    styleName,
    ...elementProps
  } = props;

  const classes = getStyles(styles, ['body']);
  const textClasses = getStyles(styles, ['body --text']);

  const media = useMedia();

  const resolveStyle = useStyle([classes, style], styleName);
  const resolveTextStyle = useStyle([textClasses, textStyle]);

  const contextValue = useMemo(
    () => ({
      style: resolveTextStyle({ media }),
    }),
    [resolveTextStyle, media],
  );

  return (
    <SafeAreaView
      {...elementProps}
      ref={ref}
      edges={edges}
      style={resolveStyle({ media })}
    >
      <TextStyleContext.Provider value={contextValue}>
        {children}
      </TextStyleContext.Provider>
    </SafeAreaView>
  );
});

Body.displayName = 'Body';

export default Body;
