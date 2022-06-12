import React, { useRef } from 'react';
import { Modal as BaseModal } from 'react-native';
import PropTypes from 'prop-types';
import { OverlayProvider } from '@react-native-aria/overlays';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import ScrollView from '../ScrollView';
import View from '../View';
import BackdropHandler from '../helpers/BackdropHandler';
import useScrollbarEffects from '../../hooks/useScrollbarEffects';
import useModal from './useModal';
import ModalContext from './ModalContext';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

const MODAL_SIZES = ['sm', 'lg', 'xl'];

const propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(MODAL_SIZES),
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
  scrollable: PropTypes.bool,
  centered: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.modal': css`
    position: absolute; // fixed;
    top: 0;
    left: 0;
    z-index: $zindex-modal;
    // display: none;
    width: 100%;
    height: 100%;
    // overflow-x: hidden;
    // overflow-y: auto;
    // Prevent Chrome on Windows from adding a focus outline. For details, see
    // https://github.com/twbs/bootstrap/pull/10951.
    @include platform(web) {
      outline-width: 0; // outline: 0;
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
    // pointer-events: none;
    align-self: center; // added for bootstrap-rn

    @include media-breakpoint-up(sm) {
      max-width: $modal-md;
      margin: $modal-dialog-margin-y-sm-up;
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
    flex-direction: row; // added for bootstrap-rn
    flex-grow: 1; // added for bootstrap-rn
    align-items: center;
    // min-height: calc(100% - var(--#{$prefix}modal-margin) * 2);
  `,
  '.modal-content': css`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%; // Ensure ".modal-content" extends the full width of the parent ".modal-dialog"
    // counteract the pointer-events: none; in the .modal-dialog
    // pointer-events: auto;
    background-color: $modal-content-bg;
    // background-clip: padding-box;
    border: $modal-content-border-width solid $modal-content-border-color;
    border-radius: $modal-content-border-radius;
    // @include box-shadow($modal-content-box-shadow-xs);
    // Remove focus outline from opened modal
    // outline: 0;

    @include media-breakpoint-up(sm) {
      // @include box-shadow($modal-content-box-shadow-sm-up);
    }
  `,
  '.modal-content-text': css`
    color: $modal-content-color;
  `,
  '.modal-backdrop': css`
    position: absolute;
    top: 0;
    left: 0;
    z-index: $zindex-modal-backdrop;
    width: 100%;
    height: 100%;
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

const Modal = React.forwardRef((props, ref) => {
  const {
    children,
    visible,
    size,
    backdrop = true,
    scrollable = false,
    centered = false,
    onToggle: handleToggle,
    style,
    textStyle,
    ...elementProps
  } = props;

  const modalRef = useRef();
  const dialogRef = useRef();

  const modal = useModal(scrollable);

  useScrollbarEffects({
    ref: modalRef,
    keepBodyScroll: false,
    centered: true,
    visible,
  });

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
  const contentTextClasses = getStyles(styles, ['.modal-content-text']);

  // If scrollable we use a ScrollView in ModalBody, so we can use a View here.
  const FlexView = scrollable ? View : ScrollView;

  return (
    <BaseModal transparent visible={visible} onRequestClose={handleToggle}>
      {backdrop && <View style={backdropClasses} />}
      <FlexView
        ref={modalRef}
        style={classes}
        contentContainerStyle={scrollable ? undefined : { flexGrow: 1 }}
      >
        <BackdropHandler
          dialogRef={dialogRef}
          onClose={handleToggle}
          backdrop={backdrop}
        />
        <OverlayProvider>
          <View ref={dialogRef} style={dialogClasses}>
            <View
              {...elementProps}
              ref={ref}
              style={[contentClasses, style]}
              textStyle={[contentTextClasses, textStyle]}
            >
              <ModalContext.Provider value={modal}>
                {children}
              </ModalContext.Provider>
            </View>
          </View>
        </OverlayProvider>
      </FlexView>
    </BaseModal>
  );
});

Modal.displayName = 'Modal';
Modal.propTypes = propTypes;

Modal.Context = ModalContext;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
