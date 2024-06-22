import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Heading from '../Heading';
import { getStyles } from '../../utils';
import { TextProps, TextRef } from '../Text';

export interface ModalTitleProps extends TextProps {}

const styles = StyleSheet.create({
  '.modal-title': css`
    margin-bottom: 0;
    line-height: $font-size-base * $modal-title-line-height;
  `,
});

const ModalTitle = React.forwardRef<TextRef, ModalTitleProps>((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.modal-title']);

  return (
    <Heading size={5} {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </Heading>
  );
});

ModalTitle.displayName = 'ModalTitle';

export default ModalTitle;
