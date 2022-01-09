import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Heading from '../type/Heading';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.modal-title': css`
    margin-bottom: 0;
    line-height: $font-size-base * $modal-title-line-height;
  `,
});

function ModalTitle(props) {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.modal-title']);

  return (
    <Heading size={5} {...elementProps} style={[classes, style]}>
      {children}
    </Heading>
  );
}

ModalTitle.propTypes = propTypes;

export default ModalTitle;
