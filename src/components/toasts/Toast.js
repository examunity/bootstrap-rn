import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';
import ToastHeader from './ToastHeader';
import ToastBody from './ToastBody';
import ToastContainerContext from './ToastContainerContext';
import ListContext from '../helpers/ListContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.toast': css`
    width: $toast-max-width;
    max-width: 100%;
    pointer-events: auto;
    background-color: $toast-background-color;
    // background-clip: padding-box;
    border: $toast-border-width solid $toast-border-color;
    // box-shadow: $toast-box-shadow;
    border-radius: $toast-border-radius;
  `,
  '.toast --text': css`
    font-size: $toast-font-size;
    line-height: $toast-font-size * $line-height-base; // added for bootstrap-rn
    color: $toast-color;
  `,
  '.toast-container > :not(:last-child)': css`
    margin-bottom: $toast-spacing;
  `,
});

const Toast = React.forwardRef((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const listItem = useContext(ListContext);
  const container = useContext(ToastContainerContext);

  const classes = getStyles(styles, [
    '.toast',
    container && !listItem.last && '.toast-container > :not(:last-child)',
  ]);

  const textClasses = getStyles(styles, ['.toast --text']);

  return (
    <View
      {...elementProps}
      ref={ref}
      role="alert"
      aria-live="assertive"
      aria-atomic
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {children}
    </View>
  );
});

Toast.displayName = 'Toast';
Toast.propTypes = propTypes;

Toast.Header = ToastHeader;
Toast.Body = ToastBody;

export default Toast;
