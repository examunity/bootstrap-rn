import React, { useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StyleSheet from '../../style/StyleSheet';
import { concatRefs, getStyles } from '../../utils';
import css from '../../style/css';
import ScrollView, { ScrollViewRef, ScrollViewProps } from '../ScrollView';
import View, { ViewRef } from '../View';
import Dialog from '../helpers/Dialog';
import BackdropHandler from '../helpers/BackdropHandler';
import useModal from './useModal';
import ModalContext from './ModalContext';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import { ExtendedTextStyle, ExtendedViewStyle, StyleProp } from '../../types';

export interface ModalProps extends ScrollViewProps {
  visible: boolean;
  size?: 'sm' | 'lg' | 'xl';
  backdrop?: boolean | 'static';
  scrollable?: boolean;
  centered?: boolean;
  onClose: () => void;
  dialogStyle?: StyleProp<ExtendedViewStyle>;
  contentStyle?: StyleProp<ExtendedViewStyle>;
  dialogTextStyle?: StyleProp<ExtendedTextStyle>;
  contentTextStyle?: StyleProp<ExtendedTextStyle>;
}

type JustifyContentValue =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

const styles = StyleSheet.create({
  '.modal': css`
    position: absolute; // added for bootstrap-rn
    @include platform(web) {
      position: fixed;
    }
    top: 0;
    left: 0;
    bottom: 0; // added for bootstrap-rn
    right: 0; // added for bootstrap-rn
    // z-index: $zindex-modal;
    // display: none;
    // width: 100%;
    // height: 100%;
    // overflow-x: hidden;
    // overflow-y: auto;
    // Prevent Chrome on Windows from adding a focus outline. For details, see
    // https://github.com/twbs/bootstrap/pull/10951.
    @include platform(web) {
      outline-style: none; // outline: 0;
    }
    // We deliberately don't use "-webkit-overflow-scrolling: touch;" due to a
    // gnarly iOS Safari bug: https://bugs.webkit.org/show_bug.cgi?id=158342
    // See also https://github.com/twbs/bootstrap/issues/17695
  `,
  '.modal-dialog': css`
    position: relative;
    width: auto;
    margin: $modal-dialog-margin;
    // allow clicks to pass through for custom click handling to close modal
    pointer-events: auto; // pointer-events: none;

    @include media-breakpoint-up(sm) {
      width: 100%; // added for bootstrap-rn
      max-width: $modal-md;
      margin: $modal-dialog-margin-y-sm-up auto;
    }
  `,
  '.modal-dialog-scrollable': css`
    flex-shrink: 1; // added for bootstrap-rn
    // height: calc(100% - var(--#{$prefix}modal-margin) * 2);
  `,
  '.modal-dialog-scrollable .modal-content': css`
    max-height: 100%;
    overflow: hidden;
  `,
  '.modal-dialog-centered': css`
    display: flex;
    // align-items: center;
    // min-height: calc(100% - var(--#{$prefix}modal-margin) * 2);
  `,
  '.modal-content': css`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%; // Ensure ".modal-content" extends the full width of the parent ".modal-dialog"
    // counteract the pointer-events: none; in the .modal-dialog
    pointer-events: auto;
    background-color: $modal-content-bg;
    // background-clip: padding-box;
    border: $modal-content-border-width solid $modal-content-border-color;
    border-radius: $modal-content-border-radius;
    // @include box-shadow($modal-content-box-shadow-xs);
    // Remove focus outline from opened modal
    @include platform(web) {
      outline-style: none; // outline: 0;
    }

    @include media-breakpoint-up(sm) {
      // @include box-shadow($modal-content-box-shadow-sm-up);
    }
  `,
  '.modal-content --text': css`
    color: $modal-content-color;
  `,
  '.modal-backdrop': css`
    position: absolute; // added for bootstrap-rn
    @include platform(web) {
      position: fixed;
    }
    top: 0;
    left: 0;
    bottom: 0; // added for bootstrap-rn
    right: 0; // added for bootstrap-rn
    // z-index: $zindex-modal-backdrop;
    // width: 100vw;
    // height: 100vh;
    background-color: $modal-backdrop-bg;
    opacity: $modal-backdrop-opacity;
  `,
  '.modal-sm': css`
    @include media-breakpoint-up(sm) {
      max-width: $modal-sm;
    }
  `,
  '.modal-lg': css`
    @include media-breakpoint-up(lg) {
      max-width: $modal-lg;
    }
  `,
  '.modal-xl': css`
    @include media-breakpoint-up(lg) {
      max-width: $modal-lg;
    }
    @include media-breakpoint-up(xl) {
      max-width: $modal-xl;
    }
  `,
});

const Modal = React.forwardRef<ViewRef | ScrollViewRef, ModalProps>(
  (props, ref) => {
    const {
      children,
      visible,
      size,
      backdrop = true,
      scrollable = false,
      centered = false,
      onClose: handleClose,
      style,
      contentContainerStyle,
      dialogStyle,
      contentStyle,
      textStyle,
      dialogTextStyle,
      contentTextStyle,
      ...elementProps
    } = props;

    const modalRef = useRef<ViewRef>(null);

    const insets = useSafeAreaInsets();

    const modal = useModal(scrollable);

    const backdropClasses = getStyles(styles, ['.modal-backdrop']);
    const classes = getStyles(styles, ['.modal']);
    const dialogClasses = getStyles(styles, [
      '.modal-dialog',
      size === 'sm' && '.modal-sm',
      size === 'lg' && '.modal-lg',
      size === 'xl' && '.modal-xl',
      scrollable && '.modal-dialog-scrollable',
      centered && '.modal-dialog-centered',
    ]);
    const contentClasses = getStyles(styles, [
      '.modal-content',
      scrollable && '.modal-dialog-scrollable .modal-content',
    ]);
    const contentTextClasses = getStyles(styles, ['.modal-content --text']);

    // If scrollable we use a ScrollView in ModalBody, so we can use a View here.
    const FlexView = scrollable ? View : ScrollView;

    const centeredStyle = centered && {
      justifyContent: 'center' as JustifyContentValue,
    };

    if (!visible) {
      return null;
    }

    return (
      <Dialog
        dialogRef={modalRef}
        backgroundRef={modalRef}
        onClose={handleClose}
        backdrop={backdrop}
        backdropElement={<View style={backdropClasses} />}
      >
        <FlexView
          {...elementProps}
          // @ts-expect-error Type of ref depends on component.
          ref={concatRefs(ref, modalRef)}
          role="dialog"
          aria-modal
          aria-labelledby={modal.titleIdentifier}
          tabIndex={-1}
          style={[classes, insets, scrollable && centeredStyle, style]}
          textStyle={textStyle}
          contentContainerStyle={
            scrollable
              ? undefined
              : [{ flexGrow: 1 }, centeredStyle, contentContainerStyle]
          }
        >
          <BackdropHandler onClose={handleClose} backdrop={backdrop} />
          <View
            style={[dialogClasses, dialogStyle]}
            textStyle={dialogTextStyle}
          >
            <View
              style={[contentClasses, contentStyle]}
              textStyle={[contentTextClasses, contentTextStyle]}
            >
              <ModalContext.Provider value={modal}>
                {children}
              </ModalContext.Provider>
            </View>
          </View>
        </FlexView>
      </Dialog>
    );
  },
);

Modal.displayName = 'Modal';

export default Object.assign(Modal, {
  Context: ModalContext,
  Header: ModalHeader,
  Title: ModalTitle,
  Body: ModalBody,
  Footer: ModalFooter,
});
