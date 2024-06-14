import React from 'react';
import { Platform } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';

export interface BlockquoteProps extends ViewProps {}

const styles = StyleSheet.create({
  blockquote: css`
    margin-bottom: $blockquote-margin-y;
  `,
  'blockquote --text': css`
    font-size: $blockquote-font-size;
  `,
});

const Blockquote = React.forwardRef<ViewRef, BlockquoteProps>((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['blockquote']);

  const textClasses = getStyles(styles, ['blockquote --text']);

  // Accessiblity role blockquote is only supported on web.
  const role = Platform.OS === 'web' ? 'blockquote' : undefined;

  return (
    <View
      {...elementProps}
      ref={ref}
      // @ts-expect-error web only role
      role={role}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {children}
    </View>
  );
});

Blockquote.displayName = 'Blockquote';

export default Blockquote;
