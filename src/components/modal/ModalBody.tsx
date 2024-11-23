import React from 'react';
import css from '../../style/css';
import { getStyles } from '../../utils';
import useForcedContext from '../../hooks/useForcedContext';
import StyleSheet from '../../style/StyleSheet';
import View, { ViewRef } from '../View';
import ScrollView, { ScrollViewRef, ScrollViewProps } from '../ScrollView';
import ModalContext from './ModalContext';

export interface ModalBodyProps extends ScrollViewProps {}

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

const ModalBody = React.forwardRef<ViewRef | ScrollViewRef, ModalBodyProps>(
  (props, ref) => {
    const { children, style, contentContainerStyle, ...elementProps } = props;

    const { scrollable } = useForcedContext(ModalContext);

    const classes = getStyles(styles, ['.modal-body']);

    const FlexView = scrollable ? ScrollView : View;

    return (
      <FlexView
        {...elementProps}
        // @ts-expect-error Type of ref depends on component.
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
