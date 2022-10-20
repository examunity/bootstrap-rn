import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.toast-body': css`
    padding: $toast-padding-x; // apply to both vertical and horizontal
  `,
  '.toast-body --text': css`
    @include platform(web) {
      word-wrap: break-word;
    }
  `,
});

const ToastBody = React.forwardRef((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.toast-body']);

  const textClasses = getStyles(styles, ['.toast-body --text']);

  return (
    <View
      {...elementProps}
      ref={ref}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {children}
    </View>
  );
});

ToastBody.displayName = 'ToastBody';
ToastBody.propTypes = propTypes;

export default ToastBody;
