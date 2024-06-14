import React, { useMemo } from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';
import FormCheckContext from './FormCheckContext';
import FormCheckLabel from './FormCheckLabel';

export interface FormCheckProps extends ViewProps {
  reverse?: boolean;
  disabled?: boolean;
  valid?: boolean;
  invalid?: boolean;
}

const styles = StyleSheet.create({
  '.form-check': css`
    // display: block;
    flex-direction: row; // added for bootstrap-rn
    min-height: $form-check-min-height;
    // padding-left: $form-check-padding-start;
    margin-bottom: $form-check-margin-bottom;
  `,
  '.form-check-reverse': css`
    flex-direction: row-reverse; // added for bootstrap-rn
    // padding-right: $form-check-padding-start;
    // padding-left: 0;
    // text-align: right;
  `,
  '.form-switch.form-check': css`
    // padding-left: $form-switch-padding-start;
  `,
});

const FormCheck = React.forwardRef<ViewRef, FormCheckProps>((props, ref) => {
  const {
    children,
    reverse = false,
    disabled = false,
    valid = false,
    invalid = false,
    style,
    ...elementProps
  } = props;

  const classes = getStyles(styles, [
    '.form-check',
    reverse && '.form-check-reverse',
  ]);

  const contextValue = useMemo(
    () => ({ reverse, disabled, valid, invalid }),
    [reverse, disabled, valid, invalid],
  );

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      <FormCheckContext.Provider value={contextValue}>
        {children}
      </FormCheckContext.Provider>
    </View>
  );
});

FormCheck.displayName = 'FormCheck';

export default Object.assign(FormCheck, {
  Label: FormCheckLabel,
});
