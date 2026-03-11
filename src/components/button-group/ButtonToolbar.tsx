import React from 'react';
import View, { ViewProps, ViewRef } from '../View';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';

export interface ButtonToolbarProps extends ViewProps {}

const styles = StyleSheet.create({
  '.btn-toolbar': css`
    display: flex;
    flex-direction: row; // added for bootstrap-rn
    flex-wrap: wrap;
    justify-content: flex-start;
  `,
});

function ButtonToolbar(
  props: ButtonToolbarProps & React.RefAttributes<ViewRef>,
) {
  const { ref, children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.btn-toolbar']);

  return (
    <View {...elementProps} ref={ref} role="toolbar" style={[classes, style]}>
      {children}
    </View>
  );
}

export default ButtonToolbar;
