import React from 'react';
import { View, Feedback, FormText, css, StyleSheet } from 'bootstrap-rn';
import { ViewProps } from '../../src/components/View';

interface FieldProps extends ViewProps {
  children: React.ReactNode;
  error?: React.ReactNode;
  touched: boolean;
  info?: string;
}
const styles = StyleSheet.create({
  formGroup: css`
    margin-bottom: 1rem;
  `,
});

function Field(props: FieldProps) {
  const {
    children,
    error,
    touched = false,
    info,
    style,
    ...elementProps
  } = props;

  return (
    <View {...elementProps} style={[styles.formGroup, style]}>
      {children}
      {touched && error && <Feedback type="valid">{error}</Feedback>}
      {info && <FormText styleName="text-muted">{info}</FormText>}
    </View>
  );
}

export default Field;
