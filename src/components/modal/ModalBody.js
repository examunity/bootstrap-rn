import React from 'react';
import PropTypes from 'prop-types';
import css from '../../style/css';
import { getStyles } from '../../utils';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.modal-body': css`
    position: relative;
    // Enable "flex-grow: 1" so that the body take up as much space as possible
    // when there should be a fixed height on ".modal-dialog".
    flex: 1 1 auto;
    padding: $modal-inner-padding;
  `,
});

const ModalBody = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.modal-body']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </View>
  );
});

ModalBody.displayName = 'ModalBody';
ModalBody.propTypes = propTypes;

export default ModalBody;
