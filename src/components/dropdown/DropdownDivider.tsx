import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import View, { ViewProps, ViewRef } from '../View';

export interface DropdownDividerProps extends ViewProps {}

const styles = StyleSheet.create({
  '.dropdown-divider': css`
    height: 0;
    margin: $dropdown-divider-margin-y 0;
    overflow: hidden;
    border-top-width: 1px;
    border-style: solid;
    border-color: $dropdown-divider-bg;
  `,
});

function DropdownDivider(
  props: DropdownDividerProps & React.RefAttributes<ViewRef>,
) {
  const { ref, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.dropdown-divider']);

  return <View {...elementProps} ref={ref} style={[classes, style]} />;
}

export default DropdownDivider;
