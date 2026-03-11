import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Heading from '../Heading';
import { getStyles } from '../../utils';
import type { TextProps, TextRef } from '../Text';
import useForcedContext from '../../hooks/useForcedContext';
import ModalContext from './ModalContext';

export interface ModalTitleProps extends TextProps {}

const styles = StyleSheet.create({
  '.modal-title': css`
    margin-bottom: 0;
    line-height: $font-size-base * $modal-title-line-height;
  `,
});

function ModalTitle(props: ModalTitleProps & React.RefAttributes<TextRef>) {
  const { ref, children, style, ...elementProps } = props;

  const { identifier } = useForcedContext(ModalContext);

  const classes = getStyles(styles, ['.modal-title']);

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

export default ModalTitle;
