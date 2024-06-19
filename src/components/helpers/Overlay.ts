import React, { useRef, ReactNode } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useOverlayPosition } from '@react-native-aria/overlays';
import type { RnPlacement, RnPlacementAxis } from '../../types';

type ChildOverlayProps = {
  style?: unknown;
};
type ChildArrowProps = {
  style?: unknown;
};

type OverlayReturnType = {
  placement: RnPlacementAxis;
  rendered?: boolean;
  overlayProps?: ChildOverlayProps;
  arrowProps?: ChildArrowProps;
};

interface OverlayProps {
  children: (
    overlay: OverlayReturnType,
    overlayRef: React.RefObject<unknown>,
  ) => ReactNode;
  placement: RnPlacement;
  targetRef: React.RefObject<unknown>;
  offset?: number;
  arrowOffset?: number;
  visible: boolean;
}

const Overlay: React.FC<OverlayProps> = ({
  children,
  targetRef,
  placement,
  offset,
  arrowOffset = 0,
  visible,
}) => {
  const overlayRef = useRef(null);

  const overlay = useOverlayPosition({
    placement,
    targetRef,
    overlayRef,
    offset,
    isOpen: visible,
  });

  // Remove unnecessary arrow styles and adjust arrow offset.
  if (placement === 'top' || placement === 'bottom') {
    // @ts-expect-error workaround for correct positioning
    delete overlay.arrowProps.style.top;
    if (typeof overlay.arrowProps.style.left === 'number') {
      overlay.arrowProps.style.left -= arrowOffset;
    }
  }
  if (placement === 'left' || placement === 'right') {
    // @ts-expect-error workaround for correct positioning
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

export default Overlay;
