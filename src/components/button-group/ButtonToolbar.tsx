import React from 'react';
import View from '../View';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';

export interface ButtonToolbarProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}
const styles = StyleSheet.create({
  '.btn-toolbar': css`
    display: flex;
    flex-direction: row; // added for bootstrap-rn
    flex-wrap: wrap;
    justify-content: flex-start;
  `,
});

const ButtonToolbar = React.forwardRef<ViewRef, ButtonToolbarProps>(
  (props, ref) => {
    const { children, style, ...elementProps } = props;

    const classes = getStyles(styles, ['.btn-toolbar']);

    return (
      <View {...elementProps} ref={ref} role="toolbar" style={[classes, style]}>
        {children}
      </View>
    );
  },
);

ButtonToolbar.displayName = 'ButtonToolbar';

export default ButtonToolbar;
