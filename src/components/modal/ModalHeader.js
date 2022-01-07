import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';
import css from '../../style/css';
import { getStyles } from '../../utils';

const propTypes = { children: PropTypes.node.isRequired };

const styles = StyleSheet.create({
  '.modal-header': css`
    padding-horizontal: $modal-header-padding-x;
    padding-vertical: $modal-header-padding-y;
    border-bottom-width: $modal-header-border-width;
    border-style: solid;
    border-color: $modal-header-border-color;
    flex-direction: row;
    justify-content: space-between;
  `,
});

function ModalHeader(props) {
  const { children, ...elementProps } = props;

  const classes = getStyles(styles, ['.modal-header']);

  return (
    <View style={[classes, elementProps.style]} {...elementProps}>
      {children}
    </View>
  );
}

ModalHeader.propTypes = propTypes;

export default ModalHeader;
