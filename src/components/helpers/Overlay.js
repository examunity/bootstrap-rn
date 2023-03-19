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

  // Remove unnecessary arrow styles and adjust arrow offset.
  if (placement === 'top' || placement === 'bottom') {
    delete overlay.arrowProps.style.top;
    if (typeof overlay.arrowProps.style.left === 'number') {
      overlay.arrowProps.style.left -= arrowOffset;
    }
  }
  if (placement === 'left' || placement === 'right') {
    delete overlay.arrowProps.style.left;
    if (typeof overlay.arrowProps.style.top === 'number') {
      overlay.arrowProps.style.top -= arrowOffset;
    }
  }

  // Adjust top value by status bar height on Android
  if (Platform.OS === 'android' && StatusBar.currentHeight) {
    if (typeof overlay.overlayProps.style.top === 'number') {
      overlay.overlayProps.style.top -= StatusBar.currentHeight;
    }
    if (typeof overlay.arrowProps.style.top === 'number') {
      overlay.arrowProps.style.top -= StatusBar.currentHeight;
    }
  }

  return children(overlay, overlayRef);
};

Overlay.displayName = 'Overlay';
Overlay.propTypes = propTypes;

export default Overlay;
