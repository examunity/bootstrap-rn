import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Heading from '../Heading';
import { getStyles } from '../../utils';
import { TextProps, TextRef } from '../Text';

export interface OffcanvasTitleProps extends TextProps {}

const styles = StyleSheet.create({
  '.offcanvas-title': css`
    margin-bottom: 0;
    line-height: $font-size-base * $offcanvas-title-line-height;
  `,
});

const OffcanvasTitle = React.forwardRef<TextRef, OffcanvasTitleProps>(
  (props, ref) => {
    const { children, style, ...elementProps } = props;

    const classes = getStyles(styles, ['.offcanvas-title']);

    return (
      <Heading size={5} {...elementProps} ref={ref} style={[classes, style]}>
        {children}
      </Heading>
    );
  },
);

OffcanvasTitle.displayName = 'OffcanvasTitle';

export default OffcanvasTitle;
