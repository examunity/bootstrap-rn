import React from 'react';
import { Platform } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Text, { TextProps, TextRef } from '../Text';
import { getStyles } from '../../utils';

export interface CodeProps extends TextProps {}

const styles = StyleSheet.create({
  code: css`
    font-family: $font-family-code;
    font-size: $code-font-size;
    color: $code-color;
    @include platform(web) {
      word-wrap: break-word;
    }
  `,
});

const Code = React.forwardRef<TextRef, CodeProps>((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['code']);

  // Accessiblity role code is only supported on web.
  const role = Platform.OS === 'web' ? 'code' : undefined;

  return (
    // @ts-expect-error web only role
    <Text {...elementProps} ref={ref} role={role} style={[classes, style]}>
      {children}
    </Text>
  );
});

Code.displayName = 'Code';

export default Code;
