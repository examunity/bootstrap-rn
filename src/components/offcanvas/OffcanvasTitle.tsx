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

function OffcanvasTitle(
  props: OffcanvasTitleProps & React.RefAttributes<TextRef>,
) {
  const { ref, children, style, ...elementProps } = props;

  const { identifier } = useForcedContext(OffcanvasContext);

  const classes = getStyles(styles, ['.offcanvas-title']);

  return (
    <Heading
      id={`${identifier}-title`}
      size={5}
      {...elementProps}
      ref={ref}
      style={[classes, style]}
    >
      {children}
    </Heading>
  );
}

export default OffcanvasTitle;
