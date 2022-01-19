import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import View from '../View';

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

const DropdownDivider = () => {
  const classes = getStyles(styles, ['.dropdown-divider']);

  return <View style={[classes]} />;
};

export default DropdownDivider;
