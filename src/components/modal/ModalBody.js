import React from 'react';
import PropTypes from 'prop-types';
import css from '../../style/css';
import { getStyles } from '../../utils';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';

const propTypes = { children: PropTypes.node.isRequired };

const styles = StyleSheet.create({
  '.modalBody': css`
    padding-vertical: $spacer;
    padding-horizontal: $spacer;
    flex-grow: 1;
  `,
});

function ModalBody(props) {
  const { children, ...elementProps } = props;
  const classes = getStyles(styles, ['.modalBody']);
  return (
    <View style={[classes, elementProps.style]} {...elementProps}>
      {children}
    </View>
  );
}

ModalBody.propTypes = propTypes;

export default ModalBody;
