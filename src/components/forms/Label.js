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
  '.form-label': css`
    margin-bottom: $form-label-margin-bottom;
    font-size: $form-label-font-size;
    font-style: $form-label-font-style;
    font-weight: $form-label-font-weight;
    color: $form-label-color;
  `,
});

const Label = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.form-label']);

  return (
    <Text {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </Text>
  );
});

Label.displayName = 'Label';
Label.propTypes = propTypes;

export default Label;
