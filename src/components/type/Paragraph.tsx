import React from 'react';
import { Platform } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Text, { TextRef } from '../Text';
import { getStyles } from '../../utils';
import { ExtendedTextStyle, StyleProp } from '../../types';

export type ParagraphProps = {
  children: React.ReactNode;
  lead?: boolean;
  style?: StyleProp<ExtendedTextStyle>;
};

const styles = StyleSheet.create({
  paragraph: css`
    margin-top: 0;
    margin-bottom: $paragraph-margin-bottom;
  `,
  '.lead': css`
    font-size: $lead-font-size;
    line-height: $lead-font-size * $line-height-base; // added for bootstrap-rn
    font-weight: $lead-font-weight;
  `,
});

const Heading = React.forwardRef<TextRef, ParagraphProps>((props, ref) => {
  const { children, lead, style, ...elementProps } = props;

  const classes = getStyles(styles, ['paragraph', lead && '.lead']);

  // Accessiblity role paragraph is only supported on web.
  const role = Platform.OS === 'web' ? 'paragraph' : undefined;

  return (
    // @ts-expect-error web only role
    <Text {...elementProps} ref={ref} role={role} style={[classes, style]}>
      {children}
    </Text>
  );
});

Heading.displayName = 'Heading';

export default Heading;
