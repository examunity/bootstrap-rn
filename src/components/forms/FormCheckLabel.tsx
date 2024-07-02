import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles, each } from '../../utils';
import Label, { LabelProps } from '../Label';
import { FORM_VALIDATION_STATES } from '../../theme/proxies';
import useForcedContext from '../../hooks/useForcedContext';
import FormCheckContext from './FormCheckContext';
import type { FormValidationState, ThemeVariables } from '../../types';
import type { ViewRef } from '../View';

export interface FormCheckLabelProps extends LabelProps {}

const styles = StyleSheet.create({
  '.form-check-input:disabled ~ .form-check-label': css`
    @include platform(web) {
      cursor: default;
    }
    opacity: $form-check-label-disabled-opacity;
  `,
  '.form-check-label': css`
    flex-shrink: 1; // added for bootstrap-rn

    @include platform(web) {
      cursor: $form-check-label-cursor;
    }
  `,
  '.form-check-label --text': css`
    color: $form-check-label-color;
  `,
  ...each(FORM_VALIDATION_STATES, (state, data: FormValidationState) => ({
    [`.form-check-input:${state} ~ .form-check-label --text`]: css`
      color: ${(t: ThemeVariables) => data(t).color};
    `,
  })),
});

const FormCheckLabel = React.forwardRef<ViewRef, FormCheckLabelProps>(
  (props, ref) => {
    const { children, style, textStyle, ...elementProps } = props;

    const { disabled, valid, invalid } = useForcedContext(FormCheckContext);

    const classes = getStyles(styles, [
      disabled && '.form-check-input:disabled ~ .form-check-label',
      '.form-check-label',
    ]);

    const textClasses = getStyles(styles, [
      '.form-check-label --text',
      // validation
      valid && '.form-check-input:valid ~ .form-check-label --text',
      invalid && '.form-check-input:invalid ~ .form-check-label --text',
    ]);

    return (
      <Label
        {...elementProps}
        ref={ref}
        disabled={disabled}
        style={[classes, style]}
        textStyle={[textClasses, textStyle]}
      >
        {children}
      </Label>
    );
  },
);

FormCheckLabel.displayName = 'FormCheckLabel';

export default FormCheckLabel;
