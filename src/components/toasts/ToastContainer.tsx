import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';
import ToastContainerContext from './ToastContainerContext';
import useList from '../../hooks/useList';

export interface ToastContainerProps extends ViewProps {}

const styles = StyleSheet.create({
  '.toast-container': css`
    width: 100%; // max-content;
    max-width: 100%;
    pointer-events: none;
  `,
});

const ToastContainer = React.forwardRef<ViewRef, ToastContainerProps>(
  (props, ref) => {
    const { children, style, ...elementProps } = props;

    const list = useList(children);

    const classes = getStyles(styles, ['.toast-container']);

    return (
      <View {...elementProps} ref={ref} style={[classes, style]}>
        <ToastContainerContext.Provider value>
          {list}
        </ToastContainerContext.Provider>
      </View>
    );
  },
);

ToastContainer.displayName = 'ToastContainer';

export default ToastContainer;
