import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useOverlayPosition } from '@react-native-aria/overlays';

const propTypes = {
  children: PropTypes.func.isRequired,
  placement: PropTypes.string.isRequired,
  targetRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  offset: PropTypes.number,
  visible: PropTypes.bool.isRequired,
};

const Overlay = (props) => {
  const { children, targetRef, placement, offset, visible } = props;

  const overlayRef = useRef();

  const overlay = useOverlayPosition({
    placement,
    targetRef,
    overlayRef,
    offset,
    isOpen: visible,
  });

  // Remove undefined arrow styles
  if (overlay.arrowProps.style.left === undefined) {
    delete overlay.arrowProps.style.left;
  }
  if (overlay.arrowProps.style.top === undefined) {
    delete overlay.arrowProps.style.top;
  }

  return children(overlay, overlayRef);
};

Overlay.displayName = 'Overlay';
Overlay.propTypes = propTypes;

export default Overlay;
