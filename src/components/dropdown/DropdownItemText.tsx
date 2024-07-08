import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import View, { ViewProps, ViewRef } from '../View';
import Text from '../Text';

export interface DropdownItemTextProps extends ViewProps {}

const styles = StyleSheet.create({
  '.dropdown-item-text': css`
    // display: block;
    padding: $dropdown-item-padding-y $dropdown-item-padding-x;
  `,
  '.dropdown-item-text --text': css`
    color: $dropdown-link-color;
  `,
});

const DropdownItemText = React.forwardRef<ViewRef, DropdownItemTextProps>(
  (props, ref) => {
    const { children, style, textStyle, ...elementProps } = props;

    const classes = getStyles(styles, ['.dropdown-item-text']);
    const textClasses = getStyles(styles, ['.dropdown-item-text --text']);

    return (
      <View {...elementProps} ref={ref} style={[classes, style]}>
        <Text style={[textClasses, textStyle]}>{children}</Text>
      </View>
    );
  },
);

DropdownItemText.displayName = 'DropdownItemText';

export default DropdownItemText;
