import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import Text from '../Text';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.form-label': css`
    margin-bottom: $form-label-margin-bottom;
  `,
  '.form-label-text': css`
    font-size: $form-label-font-size;
    font-style: $form-label-font-style;
    font-weight: $form-label-font-weight;
    color: $form-label-color;
  `,
});

const Label = React.forwardRef((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.form-label']);
  const textClasses = getStyles(styles, ['.form-label-text']);

  // composite component
  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      <Text style={[textClasses, textStyle]}>{children}</Text>
    </View>
  );
});

Label.displayName = 'Label';
Label.propTypes = propTypes;

export default Label;
