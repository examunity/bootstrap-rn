import { useRef } from 'react';
import { Platform, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { useOverlayPosition } from '@react-native-aria/overlays';

const propTypes = {
  children: PropTypes.func.isRequired,
  placement: PropTypes.string.isRequired,
  targetRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  offset: PropTypes.number,
  arrowOffset: PropTypes.number,
  visible: PropTypes.bool.isRequired,
};

const Overlay = (props) => {
  const {
    children,
    targetRef,
    placement,
    offset,
    arrowOffset = 0,
    visible,
  } = props;

  const overlayRef = useRef();

  const overlay = useOverlayPosition({
    placement,
    targetRef,
    overlayRef,
    offset,
    isOpen: visible,
  });

  // Remove undefined arrow styles and adjust arrow offset.
  if (overlay.arrowProps.style.left === undefined) {
    delete overlay.arrowProps.style.left;
    if (overlay.arrowProps.style.top) {
      overlay.arrowProps.style.top -= arrowOffset;
    }
  }
  if (overlay.arrowProps.style.top === undefined) {
    delete overlay.arrowProps.style.top;
    if (overlay.arrowProps.style.left) {
      overlay.arrowProps.style.left -= arrowOffset;
    }
  }

  // Adjust bottom value by status bar height on Android
  if (
    Platform.OS === 'android' &&
    overlay.overlayProps.style.bottom !== undefined &&
    StatusBar.currentHeight
  ) {
    overlay.overlayProps.style.bottom -= StatusBar.currentHeight;
  }

  return children(overlay, overlayRef);
};

Overlay.displayName = 'Overlay';
Overlay.propTypes = propTypes;

export default Overlay;
