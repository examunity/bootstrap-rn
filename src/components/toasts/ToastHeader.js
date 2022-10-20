import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { subtract } from '../../theme/functions';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.toast-header': css`
    display: flex;
    flex-direction: row; // added for bootstrap-rn
    align-items: center;
    padding: $toast-padding-y $toast-padding-x;
    background-color: $toast-header-background-color;
    // background-clip: padding-box;
    border-bottom-width: $toast-border-width;
    border-style: solid;
    border-color: $toast-header-border-color;
    border-top-left-radius: ${subtract(
      (t) => t['toast-border-radius'],
      (t) => t['toast-border-width'],
    )};
    border-top-right-radius: ${subtract(
      (t) => t['toast-border-radius'],
      (t) => t['toast-border-width'],
    )};
  `,
  '.toast-header --text': css`
    color: $toast-header-color;
  `,
});

const ToastHeader = React.forwardRef((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.toast-header']);

  const textClasses = getStyles(styles, ['.toast-header --text']);

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

ToastHeader.displayName = 'ToastHeader';
ToastHeader.propTypes = propTypes;

export default ToastHeader;
