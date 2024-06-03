import React from 'react';
import { View as BaseView, ScrollView as BaseScrollView } from 'react-native';
import css from '../../style/css';
import { getStyles } from '../../utils';
import useForcedContext from '../../hooks/useForcedContext';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';
import ScrollView from '../ScrollView';
import ModalContext from './ModalContext';

export type ModalBodyProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  contentContainerStyle?: unknown;
};

const styles = StyleSheet.create({
  '.modal-body': css`
    position: relative;
    // Enable "flex-grow: 1" so that the body take up as much space as possible
    // when there should be a fixed height on ".modal-dialog".
    // Note from bootstrap-rn: Centered modals do not work with this style, but
    // everything just works fine without this style.
    // flex: 1 1 auto;
    padding: $modal-inner-padding;
  `,
});

const ModalBody = React.forwardRef<BaseScrollView | BaseView, ModalBodyProps>(
  (props, ref) => {
    const { children, style, contentContainerStyle, ...elementProps } = props;

    const { scrollable } = useForcedContext(ModalContext);

    const classes = getStyles(styles, ['.modal-body']);

    const FlexView = scrollable ? ScrollView : View;

    return (
      <FlexView
        {...elementProps}
        ref={ref}
        style={scrollable ? style : [classes, style]}
        contentContainerStyle={
          scrollable ? [classes, contentContainerStyle] : undefined
        }
      >
        {children}
      </FlexView>
    );
  },
);

ModalBody.displayName = 'ModalBody';

export default ModalBody;
