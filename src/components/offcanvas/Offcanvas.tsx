import React, { useContext, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Dialog from '../helpers/Dialog';
import View, { ViewProps, ViewRef } from '../View';
import { GRID_BREAKPOINTS } from '../../theme/proxies';
import { infix, next } from '../../theme/breakpoints';
import { getStyles, each, concatRefs } from '../../utils';
import useMedia from '../../hooks/useMedia';
import NavbarContext from '../navbar/NavbarContext';
import BackdropHandler from '../helpers/BackdropHandler';
import useOffcanvas from './useOffcanvas';
import OffcanvasContext from './OffcanvasContext';
import OffcanvasHeader from './OffcanvasHeader';
import OffcanvasTitle from './OffcanvasTitle';
import OffcanvasBody from './OffcanvasBody';

export interface OffcanvasProps extends ViewProps {
  visible?: boolean;
  placement?: 'top' | 'bottom' | 'start' | 'end';
  backdrop?: boolean | 'static';
  scroll?: boolean;
  onClose: () => void;
}

const styles = StyleSheet.create({
  '.offcanvas': css`
    position: absolute; // added for bootstrap-rn
    @include platform(web) {
      position: fixed;
    }
    // bottom: 0;
    // z-index: $zindex-offcanvas;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    // visibility: hidden;
    background-color: $offcanvas-bg-color;
    // background-clip: padding-box;
    @include platform(web) {
      outline-style: none; // outline: 0;
    }
    // @include box-shadow($offcanvas-box-shadow);
    // @include transition(transform $offcanvas-transition-duration ease-in-out);
  `,
  '.offcanvas --text': css`
    color: $offcanvas-color;
  `,
  '.offcanvas-backdrop': css`
    position: absolute; // added for bootstrap-rn
    @include platform(web) {
      position: fixed;
    }
    top: 0;
    left: 0;
    bottom: 0; // added for bootstrap-rn
    right: 0; // added for bootstrap-rn
    // z-index: $zindex-offcanvas-backdrop;
    // width: 100vw;
    // height: 100vh;
    background-color: $offcanvas-backdrop-bg;
    opacity: $offcanvas-backdrop-opacity;
  `,
  '.offcanvas-start': css`
    top: 0;
    bottom: 0; // added for bootstrap-rn
    left: 0;
    width: $offcanvas-horizontal-width;
    border-right-width: $offcanvas-border-width;
    border-style: solid;
    border-color: $offcanvas-border-color;
    // transform: translateX(-100%);
  `,
  '.offcanvas-end': css`
    top: 0;
    bottom: 0; // added for bootstrap-rn
    right: 0;
    width: $offcanvas-horizontal-width;
    border-left-width: $offcanvas-border-width;
    border-style: solid;
    border-color: $offcanvas-border-color;
    // transform: translateX(100%);
  `,
  '.offcanvas-top': css`
    top: 0;
    right: 0;
    left: 0;
    height: $offcanvas-vertical-height;
    max-height: 100%;
    border-bottom-width: $offcanvas-border-width;
    border-style: solid;
    border-color: $offcanvas-border-color;
    // transform: translateY(-100%);
  `,
  '.offcanvas-bottom': css`
    bottom: 0; // added for bootstrap-rn
    right: 0;
    left: 0;
    height: $offcanvas-vertical-height;
    max-height: 100%;
    width: 100%;
    border-top-width: $offcanvas-border-width;
    border-style: solid;
    border-color: $offcanvas-border-color;
    // transform: translateY(100%);
  `,
  '.offcanvas-dialog': css`
    max-width: 100%; // added for bootstrap-rn
    max-height: 100%; // added for bootstrap-rn
  `,
  '.offcanvas-dialog-start': css``,
  '.offcanvas-dialog-end': css``,
  '.offcanvas-dialog-top': css``,
  '.offcanvas-dialog-bottom': css``,
  // Navbar styles
  ...each(GRID_BREAKPOINTS, (breakpoint) => ({
    [`.navbar-expand${infix(next(breakpoint))} .offcanvas`]: css`
      @include media-breakpoint-up(${next(breakpoint)}) {
        position: relative; // inherit;
        bottom: 0;
        // z-index: auto;
        flex-grow: 1;
        // visibility: visible !important; // stylelint-disable-line declaration-no-important
        background-color: transparent;
        border-right-width: 0;
        border-left-width: 0;
        // @include box-shadow(none);
        // @include transition(none);
        // transform: none;
      }
    `,
  })),
});

const Offcanvas = React.forwardRef<ViewRef, OffcanvasProps>((props, ref) => {
  const {
    children,
    visible = false,
    placement = 'top',
    backdrop = true,
    scroll = false,
    onClose: handleClose,
    style,
    textStyle,
    ...elementProps
  } = props;

  const media = useMedia();
  const navbar = useContext(NavbarContext);

  const offcanvasRef = useRef<ViewRef>(null);
  const backdropRef = useRef<ViewRef>(null);

  const insets = useSafeAreaInsets();

  const offcanvas = useOffcanvas();

  const backdropClasses = getStyles(styles, ['.offcanvas-backdrop']);
  const classes = getStyles(styles, [
    '.offcanvas',
    `.offcanvas-${placement}`,
    navbar &&
      navbar.expand &&
      `.navbar-expand${
        navbar.expand === true ? '' : `-${navbar.expand}`
      } .offcanvas`,
  ]);
  /* const dialogClasses = getStyles(styles, [
    '.offcanvas-dialog',
    `.offcanvas-dialog-${placement}`,
  ]); */
  const textClasses = getStyles(styles, ['.offcanvas-content --text']);

  // Render children without modal for navbar.
  if (
    navbar &&
    navbar.expand &&
    (navbar.expand === true || media.up(navbar.expand))
  ) {
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
  }

  if (!visible) {
    return null;
  }

  return (
    <Dialog
      dialogRef={offcanvasRef}
      backgroundRef={backdropRef}
      onClose={handleClose}
      backdrop={backdrop}
      backdropElement={
        <View ref={backdropRef} style={[backdropClasses, insets]} />
      }
      scroll={scroll}
    >
      <BackdropHandler onClose={handleClose} backdrop={backdrop} />
      <View
        {...elementProps}
        ref={concatRefs(ref, offcanvasRef)}
        role="dialog"
        aria-modal
        aria-labelledby={offcanvas.titleIdentifier}
        tabIndex={-1}
        style={[
          classes,
          {
            marginTop: insets.top,
            marginBottom: insets.bottom,
            marginRight: insets.right,
            marginLeft: insets.left,
          },
          style,
        ]}
        textStyle={[textClasses, textStyle]}
      >
        <OffcanvasContext.Provider value={offcanvas}>
          {children}
        </OffcanvasContext.Provider>
      </View>
    </Dialog>
  );
});

Offcanvas.displayName = 'Offcanvas';

export default Object.assign(Offcanvas, {
  Context: OffcanvasContext,
  Header: OffcanvasHeader,
  Title: OffcanvasTitle,
  Body: OffcanvasBody,
});
