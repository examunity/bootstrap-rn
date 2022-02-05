import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';
import css from '../../style/css';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.modal-footer': css`
    display: flex;
    flex-direction: row; // added for bootstrap-native
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

const ModalFooter = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.modal-footer']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </View>
  );
});

ModalFooter.displayName = 'ModalFooter';
ModalFooter.propTypes = propTypes;

export default ModalFooter;
