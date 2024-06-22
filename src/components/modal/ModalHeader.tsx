import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import View, { ViewProps, ViewRef } from '../View';
import css from '../../style/css';
import { getStyles } from '../../utils';

export interface ModalHeaderProps extends ViewProps {}

const styles = StyleSheet.create({
  '.modal-header': css`
    display: flex;
    flex-direction: row; // added for bootstrap-rn
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between; // Put modal header elements (title and dismiss) on opposite ends
    padding: $modal-header-padding;
    border-bottom-width: $modal-header-border-width;
    border-style: solid;
    border-color: $modal-header-border-color;
    border-top-left-radius: $modal-content-inner-border-radius;
    border-top-right-radius: $modal-content-inner-border-radius;
  `,
});

const ModalHeader = React.forwardRef<ViewRef, ModalHeaderProps>(
  (props, ref) => {
    const { children, style, ...elementProps } = props;

    const classes = getStyles(styles, ['.modal-header']);

    return (
      <View {...elementProps} ref={ref} style={[classes, style]}>
        {children}
      </View>
    );
  },
);

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
