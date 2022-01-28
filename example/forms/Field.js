import React from 'react';
import PropTypes from 'prop-types';
import { View, Feedback, FormText, css, StyleSheet } from 'bootstyle';

const propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.node,
  touched: PropTypes.bool.isRequired,
  info: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  elementProps: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  formGroup: css`
    margin-bottom: 1rem;
  `,
});

function Field(props) {
  const { children, error, touched = false, info, elementProps } = props;

  return (
    <View {...elementProps} style={[styles.formGroup, elementProps.style]}>
      {children}
      {touched && error && <Feedback type="valid">{error}</Feedback>}
      {info && <FormText styleName="text-muted">{info}</FormText>}
    </View>
  );
}

Field.propTypes = propTypes;

export default Field;
