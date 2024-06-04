import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';

export type RowProps = {
  children: React.ReactNode;
  rows?: number;
  style?: React.CSSProperties;
};

const styles = StyleSheet.create({
  '.row': css`
    display: flex;
    flex-direction: row; // added for bootstrap-rn
    flex-wrap: wrap;
    margin-top: 0;
    margin-right: -0.5 * $grid-gutter-width;
    margin-left: -0.5 * $grid-gutter-width;
  `,
});

const Row = React.forwardRef<ViewRef, RowProps>((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.row']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </View>
  );
});

Row.displayName = 'Row';

export default Row;
