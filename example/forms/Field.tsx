import React from 'react';
import { View, Feedback, FormText, css, StyleSheet } from 'bootstrap-rn';
import { ViewRef } from '../../src/components/View';

interface FieldProps {
  children: React.ReactNode;
  error?: React.ReactNode;
  touched: boolean;
  info?: string;
  style?: React.CSSProperties;
  elementProps: {
    [key: string]: unknown;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    style?: any;
  };
}
const styles = StyleSheet.create({
  formGroup: css`
    margin-bottom: 1rem;
  `,
});

const Field = React.forwardRef<ViewRef, FieldProps>((props) => {
  const { children, error, touched = false, info, elementProps } = props;

  return (
    <View {...elementProps} style={[styles.formGroup, elementProps.style]}>
      {children}
      {touched && error && <Feedback type="valid">{error}</Feedback>}
      {info && <FormText styleName="text-muted">{info}</FormText>}
    </View>
  );
});

export default Field;
