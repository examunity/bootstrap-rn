import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';
import View from '../View';

export interface PlaceholdersProps extends ViewProps {}

const styles = StyleSheet.create({
  '.placeholders': css``,
});

const Placeholders = React.forwardRef<ViewRef, PlaceholdersProps>(
  (props, ref) => {
    const { children, style, ...elementProps } = props;

    const classes = getStyles(styles, ['.placeholders']);

    return (
      <View {...elementProps} ref={ref} style={[classes, style]}>
        {children}
      </View>
    );
  },
);

Placeholders.displayName = 'Placeholders';

export default Placeholders;

/*
$placeholder-opacity-max:           .5;
$placeholder-opacity-min:           .2;
*/
