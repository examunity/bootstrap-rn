import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Label from '../Label';
import { getStyles } from '../../utils';
import type { ViewRef } from '../View';
import type {
  ExtendedTextStyle,
  ExtendedViewStyle,
  StyleProp,
} from '../../types';

export type FormLabelProps = {
  children: React.ReactNode;
  style?: StyleProp<ExtendedViewStyle>;
  textStyle?: StyleProp<ExtendedTextStyle>;
};

const styles = StyleSheet.create({
  '.form-label': css`
    margin-bottom: $form-label-margin-bottom;
  `,
  '.form-label --text': css`
    font-size: $form-label-font-size;
    line-height: $form-label-font-size * $line-height-base; // added for bootstrap-rn
    font-style: $form-label-font-style;
    font-weight: $form-label-font-weight;
    color: $form-label-color;
  `,
});

const FormLabel = React.forwardRef<ViewRef, FormLabelProps>((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.form-label']);
  const textClasses = getStyles(styles, ['.form-label --text']);

  return (
    <Label
      {...elementProps}
      ref={ref}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {children}
    </Label>
  );
});

FormLabel.displayName = 'FormLabel';

export default FormLabel;
