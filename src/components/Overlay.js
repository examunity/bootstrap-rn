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

  return children(overlay, overlayRef);
};

Overlay.displayName = 'Overlay';
Overlay.propTypes = propTypes;

export default Overlay;
