import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';
import css from '../../style/css';
import { getStyles } from '../../utils';

const propTypes = { children: PropTypes.node.isRequired };

const styles = StyleSheet.create({
  '.modalFooter': css`
    // padding-horizontal: $modal-footer-padding-x;
    // padding-vertical: $modal-footer-padding-y;
    border-top-width: $modal-footer-border-width;
    border-style: solid;
    border-color: $modal-footer-border-color;
  `,
});

function ModalFooter(props) {
  const { children, ...elementProps } = props;

  const classes = getStyles(styles, ['.modalFooter']);

  return (
    <View style={[classes, elementProps.style]} {...elementProps}>
      {children}
    </View>
  );
}

ModalFooter.propTypes = propTypes;

export default ModalFooter;
