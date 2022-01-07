import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';
import css from '../../style/css';
import { getStyles } from '../../utils';

const propTypes = { children: PropTypes.node.isRequired };

const styles = StyleSheet.create({
  '.modal-footer': css`
    padding-horizontal: $modal-header-padding-x;
    padding-vertical: $modal-header-padding-y;
    border-top-width: $modal-footer-border-width;
    border-style: solid;
    border-color: $modal-footer-border-color;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;
    flex-grow: 1;
  `,
});

function ModalFooter(props) {
  const { children, ...elementProps } = props;

  const classes = getStyles(styles, ['.modal-footer']);

  return (
    <View style={[classes, elementProps.style]} {...elementProps}>
      {children}
    </View>
  );
}

ModalFooter.propTypes = propTypes;

export default ModalFooter;
