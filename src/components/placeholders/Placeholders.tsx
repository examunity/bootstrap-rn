import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';
import View, { ViewProps, ViewRef } from '../View';

export interface PlaceholdersProps extends ViewProps {}

const styles = StyleSheet.create({
  '.placeholders': css``,
});

function Placeholders(props: PlaceholdersProps & React.RefAttributes<ViewRef>) {
  const { ref, children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.placeholders']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </View>
  );
}

export default Placeholders;

/*
$placeholder-opacity-max:           .5;
$placeholder-opacity-min:           .2;
*/
