import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Text from '../Text';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.form-text': css`
    margin-top: $form-text-margin-top;
    font-size: $form-text-font-size;
    font-style: $form-text-font-style;
    font-weight: $form-text-font-weight;
    color: $form-text-color;
  `,
});

const FormText = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.form-text']);

  return (
    <Text {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </Text>
  );
});

FormText.displayName = 'FormText';
FormText.propTypes = propTypes;

export default FormText;
