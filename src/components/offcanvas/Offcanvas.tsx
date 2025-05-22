import React, { useContext, useRef } from 'react';
import { Modal as BaseModal, Platform } from 'react-native';
import { OverlayProvider } from '@react-native-aria/overlays';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import BackdropHandler from '../helpers/BackdropHandler';
import SafeAreaView from '../SafeAreaView';
import View, { ViewProps, ViewRef } from '../View';
import { GRID_BREAKPOINTS } from '../../theme/proxies';
import { infix, next } from '../../theme/breakpoints';
import { getStyles, each, concatRefs } from '../../utils';
import useMedia from '../../hooks/useMedia';
import NavbarContext from '../navbar/NavbarContext';
import useOffcanvas from './useOffcanvas';
import OffcanvasContext from './OffcanvasContext';
import OffcanvasHeader from './OffcanvasHeader';
import OffcanvasTitle from './OffcanvasTitle';
import OffcanvasBody from './OffcanvasBody';
import type {
  ExtendedTextStyle,
  ExtendedViewStyle,
  StyleProp,
} from '../../types';

export interface OffcanvasProps extends ViewProps {
  visible?: boolean;
  placement?: 'top' | 'bottom' | 'start' | 'end';
  backdrop?: boolean | 'static';
  scroll?: boolean;
  onToggle?: () => void;
  dialogStyle?: StyleProp<ExtendedViewStyle>;
  dialogTextStyle?: StyleProp<ExtendedTextStyle>;
}

const styles = StyleSheet.create({
  '.offcanvas': css`
    position: absolute; // fixed;
    // bottom: 0;
    z-index: $zindex-offcanvas;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    // visibility: hidden;
  `,
  '.offcanvas --text': css`
    color: $offcanvas-color;
  `,
  '.offcanvas-backdrop': css`
    position: absolute;
    top: 0;
    left: 0;
    z-index: $zindex-offcanvas-backdrop;
    width: 100%;
    height: 100%;
  `,
  '.offcanvas-backdrop-inset': css`
    background-color: $offcanvas-backdrop-bg;
    opacity: $offcanvas-backdrop-opacity;
  `,
  '.offcanvas-start': css`
    top: 0;
    bottom: 0; // added for bootstrap-rn
    left: 0;
  `,
  '.offcanvas-end': css`
    top: 0;
    bottom: 0; // added for bootstrap-rn
    right: 0;
  `,
  '.offcanvas-top': css`
    top: 0;
    right: 0;
    left: 0;
  `,
  '.offcanvas-bottom': css`
    bottom: 0; // added for bootstrap-rn
    right: 0;
    left: 0;
  `,
  '.offcanvas-inset': css`
    max-width: 100%; // added for bootstrap-rn
    max-height: 100%; // added for bootstrap-rn
    background-color: $offcanvas-bg-color;
    // background-clip: padding-box;
    @include platform(web) {
      outline-width: 0; // outline: 0;
    }
    // @include box-shadow($offcanvas-box-shadow);
    // @include transition(transform $offcanvas-transition-duration ease-in-out);
  `,
  '.offcanvas-inset-start': css`
    width: $offcanvas-horizontal-width;
    border-right-width: $offcanvas-border-width;
    border-style: solid;
    border-color: $offcanvas-border-color;
    // transform: translateX(-100%);
  `,
  '.offcanvas-inset-end': css`
    width: $offcanvas-horizontal-width;
    border-left-width: $offcanvas-border-width;
    border-style: solid;
    border-color: $offcanvas-border-color;
    // transform: translateX(100%);
  `,
  '.offcanvas-inset-top': css`
    height: $offcanvas-vertical-height;
    max-height: 100%;
    border-bottom-width: $offcanvas-border-width;
    border-style: solid;
    border-color: $offcanvas-border-color;
    // transform: translateY(-100%);
  `,
  '.offcanvas-inset-bottom': css`
    height: $offcanvas-vertical-height;
    max-height: 100%;
    width: 100%;
    border-top-width: $offcanvas-border-width;
    border-style: solid;
    border-color: $offcanvas-border-color;
    // transform: translateY(100%);
  `,
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
    onToggle: handleToggle,
    style,
    dialogStyle,
    textStyle,
    dialogTextStyle,
    ...elementProps
  } = props;

  const media = useMedia();
  const navbar = useContext(NavbarContext);
  const offcanvasRef = useRef(null);

  const offcanvas = useOffcanvas(visible, scroll);

  const backdropClasses = getStyles(styles, ['.offcanvas-backdrop']);
  const backdropInsetClasses = getStyles(styles, ['.offcanvas-backdrop-inset']);
  const classes = getStyles(styles, [
    '.offcanvas',
    `.offcanvas-${placement}`,
    navbar &&
      navbar.expand &&
      `.navbar-expand${
        navbar.expand === true ? '' : `-${navbar.expand}`
      } .offcanvas`,
  ]);
  const dialogClasses = getStyles(styles, [
    '.offcanvas-inset',
    `.offcanvas-inset-${placement}`,
  ]);
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

  return (
    <BaseModal
      transparent
      // Modal is only shown correctly on older Android versions if we set this.
      navigationBarTranslucent={
        Platform.OS === 'android' && Platform.constants.Version < 35
      }
      visible={navbar ? navbar.expanded : visible}
      onRequestClose={handleToggle}
    >
      {backdrop && (
        <SafeAreaView style={backdropClasses}>
          <View style={[{ flexGrow: 1 }, backdropInsetClasses]}>
            <BackdropHandler
              dialogRef={offcanvasRef}
              onClose={handleToggle}
              backdrop={backdrop}
            />
          </View>
        </SafeAreaView>
      )}
      <SafeAreaView
        {...elementProps}
        ref={concatRefs(offcanvasRef, ref)}
        style={[classes, style]}
        textStyle={[textClasses, textStyle]}
      >
        <View
          style={[{ flexGrow: 1 }, dialogClasses, dialogStyle]}
          textStyle={dialogTextStyle}
        >
          <OffcanvasContext.Provider value={offcanvas}>
            <OverlayProvider>{children}</OverlayProvider>
          </OffcanvasContext.Provider>
        </View>
      </SafeAreaView>
    </BaseModal>
  );
});

Offcanvas.displayName = 'Offcanvas';

export default Object.assign(Offcanvas, {
  Context: OffcanvasContext,
  Header: OffcanvasHeader,
  Title: OffcanvasTitle,
  Body: OffcanvasBody,
});
