import React, { useRef, ReactNode } from 'react';
import { Platform, StatusBar, ViewStyle } from 'react-native';
import { useOverlayPosition } from '@react-native-aria/overlays';
import type { ViewRef } from '../View';
import type { Placement, PlacementAxis } from '../../types';

type OverlayReturnType = {
  placement: PlacementAxis;
  rendered?: boolean;
  overlayProps: {
    style: ViewStyle;
  };
  arrowProps: {
    style: ViewStyle;
  };
};

interface OverlayProps {
  children: (
    overlay: OverlayReturnType,
    overlayRef: React.RefObject<ViewRef | null>,
  ) => ReactNode;
  placement: Placement;
  targetRef: React.RefObject<ViewRef | null>;
  offset?: number;
  arrowOffset?: number;
  visible: boolean;
}

function Overlay({
  children,
  targetRef,
  placement,
  offset,
  arrowOffset = 0,
  visible,
}: OverlayProps) {
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

  // Android 15 (edge-to-edge support) adjustments
  // https://github.com/facebook/react-native/issues/47080
  if (
    Platform.OS === 'android' &&
    Platform.constants.Version >= 35 &&
    StatusBar.currentHeight
  ) {
    if (typeof overlay.overlayProps.style.bottom === 'number') {
      overlay.overlayProps.style.bottom -= StatusBar.currentHeight;
    }
  }

  return children(overlay, overlayRef);
}

Overlay.displayName = 'Overlay';

export default Overlay;
