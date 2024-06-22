import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View, { ViewProps, ViewRef } from '../View';
import Text from '../Text';
import { getStyles } from '../../utils';

export interface FormTextProps extends ViewProps {}

const styles = StyleSheet.create({
  '.form-text': css`
    margin-top: $form-text-margin-top;
  `,
  '.form-text --text': css`
    font-size: $form-text-font-size;
    font-style: $form-text-font-style;
    font-weight: $form-text-font-weight;
    color: $form-text-color;
  `,
});

const FormText = React.forwardRef<ViewRef, FormTextProps>((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.form-text']);
  const textClasses = getStyles(styles, ['.form-text --text']);

  // composite component
  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      <Text style={[textClasses, textStyle]}>{children}</Text>
    </View>
  );
});

FormText.displayName = 'FormText';

export default FormText;
