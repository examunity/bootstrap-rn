import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import View from '../View';
import Heading from '../Heading';

export type DropdownHeaderProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  textStyle?: unknown;
};

const styles = StyleSheet.create({
  '.dropdown-header': css`
    // display: block;
    padding: $dropdown-header-padding;
  `,
  '.dropdown-header --text': css`
    margin-bottom: 0; // for use with heading elements
    font-size: $font-size-sm;
    color: $dropdown-header-color;
    // white-space: nowrap; // as with > li > a
  `,
});

const DropdownHeader = React.forwardRef<ViewRef, DropdownHeaderProps>(
  (props, ref) => {
    const { children, style, textStyle, ...elementProps } = props;

    const classes = getStyles(styles, ['.dropdown-header']);
    const textClasses = getStyles(styles, ['.dropdown-header --text']);

    return (
      <View {...elementProps} ref={ref} style={[classes, style]}>
        <Heading size={6} style={[textClasses, textStyle]}>
          {children}
        </Heading>
      </View>
    );
  },
);

DropdownHeader.displayName = 'DropdownHeader';

export default DropdownHeader;
