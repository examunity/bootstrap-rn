import React, { useMemo } from 'react';
import { SafeAreaView as BaseSafeAreaView } from 'react-native';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import { getStyles } from '../utils';
import TextStyleContext from '../style/TextStyleContext';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';
import { ViewRef } from './View';
import { ExtendedTextStyle, StyleProp } from '../types';

export type BodyProps = {
  children: React.ReactNode;
  style?: StyleProp<ExtendedTextStyle>;
  textStyle?: StyleProp<ExtendedTextStyle>;
  styleName?: string;
};

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

const Body = React.forwardRef<ViewRef, BodyProps>((props, ref) => {
  const { children, style, textStyle, styleName, ...elementProps } = props;

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
    <BaseSafeAreaView
      {...elementProps}
      ref={ref}
      style={resolveStyle({ media })}
    >
      <TextStyleContext.Provider value={contextValue}>
        {children}
      </TextStyleContext.Provider>
    </BaseSafeAreaView>
  );
});

Body.displayName = 'Body';

export default Body;
