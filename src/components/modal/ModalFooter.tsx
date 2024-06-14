import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';
import css from '../../style/css';
import { getStyles } from '../../utils';

export interface ModalFooterProps extends ViewProps {}

const styles = StyleSheet.create({
  '.modal-footer': css`
    display: flex;
    flex-direction: row; // added for bootstrap-rn
    flex-shrink: 0;
    flex-wrap: wrap;
    align-items: center; // vertically center
    justify-content: flex-end; // Right align buttons with flex property because text-align doesn't work on flex items
    padding: $modal-inner-padding;
    border-top-width: $modal-footer-border-width;
    border-style: solid;
    border-color: $modal-footer-border-color;
    border-bottom-start-radius: $modal-content-inner-border-radius;
    border-bottom-end-radius: $modal-content-inner-border-radius;
  `,
});

const ModalFooter = React.forwardRef<ViewRef, ModalFooterProps>(
  (props, ref) => {
    const { children, style, ...elementProps } = props;

    const classes = getStyles(styles, ['.modal-footer']);

    return (
      <View {...elementProps} ref={ref} style={[classes, style]}>
        {children}
      </View>
    );
  },
);

ModalFooter.displayName = 'ModalFooter';

export default ModalFooter;
