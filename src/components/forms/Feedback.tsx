import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Text, { TextProps, TextRef } from '../Text';
import { each, getStyles } from '../../utils';
import { FORM_VALIDATION_STATES } from '../../theme/proxies';
import type { FormValidationState, ThemeVariables } from '../../types';

export interface FeedbackProps extends TextProps {
  type?: keyof typeof FORM_VALIDATION_STATES;
}

const styles = StyleSheet.create({
  ...each(FORM_VALIDATION_STATES, (state, data: FormValidationState) => ({
    [`.${state}-feedback`]: css`
      // display: none;
      width: 100%;
      margin-top: $form-feedback-margin-top;
      font-size: $form-feedback-font-size;
      font-style: $form-feedback-font-style;
      color: ${(t: ThemeVariables) => data(t).color};
    `,
  })),
});

const Feedback = React.forwardRef<TextRef, FeedbackProps>((props, ref) => {
  const { children, type, style, ...elementProps } = props;

  const classes = getStyles(styles, [`.${type}-feedback`]);

  return (
    <Text {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </Text>
  );
});

Feedback.displayName = 'Feedback';

export default Feedback;
