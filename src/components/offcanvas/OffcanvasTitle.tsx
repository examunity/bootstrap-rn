import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Heading from '../Heading';
import { getStyles } from '../../utils';
import type { TextProps, TextRef } from '../Text';
import useForcedContext from '../../hooks/useForcedContext';
import OffcanvasContext from './OffcanvasContext';

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

    const { titleIdentifier } = useForcedContext(OffcanvasContext);

    const classes = getStyles(styles, ['.offcanvas-title']);

    return (
      <Heading
        id={titleIdentifier}
        size={5}
        {...elementProps}
        ref={ref}
        style={[classes, style]}
      >
        {children}
      </Heading>
    );
  },
);

OffcanvasTitle.displayName = 'OffcanvasTitle';

export default OffcanvasTitle;
