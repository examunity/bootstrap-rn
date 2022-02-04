import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles, makeListChildren } from '../../utils';
import ToastContainerContext from './ToastContainerContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.toast-container': css`
    width: 100%; // max-content;
    max-width: 100%;
    // pointer-events: none;
  `,
});

const ToastContainer = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.toast-container']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      <ToastContainerContext.Provider value>
        {makeListChildren(children)}
      </ToastContainerContext.Provider>
    </View>
  );
});

ToastContainer.displayName = 'ToastContainer';
ToastContainer.propTypes = propTypes;

export default ToastContainer;
