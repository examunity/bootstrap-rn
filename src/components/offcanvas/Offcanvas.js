import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal as BaseModal, SafeAreaView } from 'react-native';
import { OverlayProvider } from '@react-native-aria/overlays';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import BackdropHandler from '../helpers/BackdropHandler';
import View from '../View';
import { GRID_BREAKPOINTS } from '../../theme/proxies';
import { infix, next } from '../../theme/breakpoints';
import { getStyles, each, concatRefs } from '../../utils';
import useMedia from '../../hooks/useMedia';
import useScrollbarEffects from '../../hooks/useScrollbarEffects';
import NavbarContext from '../navbar/NavbarContext';
import useOffcanvas from './useOffcanvas';
import OffcanvasContext from './OffcanvasContext';
import OffcanvasHeader from './OffcanvasHeader';
import OffcanvasTitle from './OffcanvasTitle';
import OffcanvasBody from './OffcanvasBody';

export const PLACEMENTS = ['top', 'bottom', 'start', 'end']; // , 'auto'

const propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
  placement: PropTypes.oneOf(PLACEMENTS),
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
  // Currently only supported on web.
  scroll: PropTypes.bool,
  onToggle: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.offcanvas': css`
    position: absolute; // fixed;
    // bottom: 0;
    z-index: $zindex-offcanvas;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    // visibility: hidden;
    background-color: $offcanvas-bg-color;
    // background-clip: padding-box;
    @include platform(web) {
      outline-width: 0; // outline: 0;
    }
    // @include box-shadow($offcanvas-box-shadow);
    // @include transition(transform $offcanvas-transition-duration ease-in-out);
  `,
  '.offcanvas-text': css`
    color: $offcanvas-color;
  `,
  '.offcanvas-backdrop': css`
    position: absolute;
    top: 0;
    left: 0;
    z-index: $zindex-offcanvas-backdrop;
    width: 100%;
    height: 100%;
    background-color: $offcanvas-backdrop-bg;
    opacity: $offcanvas-backdrop-opacity;
  `,
  '.offcanvas-start': css`
    top: 0;
    bottom: 0; // added for bootstrap-rn
    left: 0;
    // width: $offcanvas-horizontal-width;
    border-right-width: $offcanvas-border-width;
    border-style: solid;
    border-color: $offcanvas-border-color;
    // transform: translateX(-100%);
  `,
  '.offcanvas-end': css`
    top: 0;
    bottom: 0; // added for bootstrap-rn
    right: 0;
    // width: $offcanvas-horizontal-width;
    border-left-width: $offcanvas-border-width;
    border-style: solid;
    border-color: $offcanvas-border-color;
    // transform: translateX(100%);
  `,
  '.offcanvas-top': css`
    top: 0;
    right: 0;
    left: 0;
    // height: $offcanvas-vertical-height;
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
    // height: $offcanvas-vertical-height;
    max-height: 100%;
    width: 100%;
    border-top-width: $offcanvas-border-width;
    border-style: solid;
    border-color: $offcanvas-border-color;
    // transform: translateY(100%);
  `,
  // The following .offcanvas-dialog classes are added for bootstrap-rn,
  // because otherwise the text would exceed a width of 100% on native
  // and also additional width by SafeAreaView would not be applied.
  '.offcanvas-dialog': css`
    max-width: 100%;
    max-height: 100%;
  `,
  '.offcanvas-dialog-start': css`
    width: $offcanvas-horizontal-width;
  `,
  '.offcanvas-dialog-end': css`
    width: $offcanvas-horizontal-width;
  `,
  '.offcanvas-dialog-top': css`
    height: $offcanvas-vertical-height;
  `,
  '.offcanvas-dialog-bottom': css`
    height: $offcanvas-vertical-height;
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

const Offcanvas = React.forwardRef((props, ref) => {
  const {
    children,
    visible,
    placement = 'top',
    backdrop = true,
    scroll = false,
    onToggle: handleToggle,
    style,
    textStyle,
    ...elementProps
  } = props;

  const media = useMedia();
  const navbar = useContext(NavbarContext);
  const offcanvasRef = useRef();

  const offcanvas = useOffcanvas();

  useScrollbarEffects({
    keepBodyScroll: scroll,
    visible,
  });

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
  const dialogClasses = getStyles(styles, [
    '.offcanvas-dialog',
    `.offcanvas-dialog-${placement}`,
  ]);
  const textClasses = getStyles(styles, ['.offcanvas-content-text']);

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
      visible={navbar ? navbar.expanded : visible}
      onRequestClose={handleToggle}
    >
      {backdrop && (
        <View style={backdropClasses}>
          <BackdropHandler
            dialogRef={offcanvasRef}
            onClose={handleToggle}
            backdrop={backdrop}
          />
        </View>
      )}
      <View
        {...elementProps}
        ref={concatRefs(offcanvasRef, ref)}
        style={[classes, style]}
        textStyle={[textClasses, textStyle]}
      >
        <SafeAreaView style={{ flexShrink: 1 }}>
          <View style={dialogClasses}>
            <OffcanvasContext.Provider value={offcanvas}>
              <OverlayProvider>{children}</OverlayProvider>
            </OffcanvasContext.Provider>
          </View>
        </SafeAreaView>
      </View>
    </BaseModal>
  );
});

Offcanvas.displayName = 'Offcanvas';
Offcanvas.propTypes = propTypes;

Offcanvas.Context = OffcanvasContext;
Offcanvas.Header = OffcanvasHeader;
Offcanvas.Title = OffcanvasTitle;
Offcanvas.Body = OffcanvasBody;

export default Offcanvas;
