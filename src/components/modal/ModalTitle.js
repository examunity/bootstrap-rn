import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Text from '../Text';
import { getStyles } from '../../utils';

const propTypes = { children: PropTypes.node.isRequired };

const styles = StyleSheet.create({
  '.modal-title': css`
    line-height: $font-size-base * $modal-title-line-height;
  `,
});

function ModalTitle(props) {
  const { children, ...elementProps } = props;

  const classes = getStyles(styles, ['.modal-title']);

  return (
    <Text style={[classes, elementProps.style]} {...elementProps}>
      {children}
    </Text>
  );
}

ModalTitle.propTypes = propTypes;

export default ModalTitle;
