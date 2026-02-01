import { useCallback, useId, useMemo, useRef, useState } from 'react';
import {
  GestureResponderEvent,
  type LayoutChangeEvent,
  type LayoutRectangle,
} from 'react-native';
import { useRelativePosition, type LayoutPosition } from '@rn-primitives/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useControlledState from './useControlledState';
import { type ViewRef } from '../components/View';
import { type PressableRef } from '../components/Pressable';
import type {
  OverlayTrigger,
  OverlayAlignment,
  OverlayPlacement,
  OverlayPhysicalPlacement,
} from '../types';

type UseOverlayOptions = {
  defaultVisible: boolean;
  controlledVisible: boolean | undefined;
  onToggle: (value: boolean) => void;
  offset: number;
  align: OverlayAlignment;
  placement: OverlayPlacement;
  trigger?: OverlayTrigger;
};

const transformAlign = (align: OverlayAlignment) => {
  if (align === 'top') {
    return 'start';
  }

  if (align === 'bottom') {
    return 'end';
  }

  return align;
};

const getNativePlacement = (placement: OverlayPlacement) => {
  // Currently on native only top and bottom is supported.
  if (placement !== 'top') {
    return 'bottom';
  }

  return placement;
};

export default function useOverlay({
  defaultVisible,
  controlledVisible,
  onToggle,
  offset,
  align,
  placement,
}: UseOverlayOptions) {
  const identifier = useId();

  const triggerRef = useRef<PressableRef | null>(null);
  const contentRef = useRef<ViewRef | null>(null);

  const [triggerPosition, setTriggerPosition] = useState<LayoutPosition | null>(
    null,
  );
  const [contentLayout, setContentLayout] = useState<LayoutRectangle | null>(
    null,
  );
  const [arrowLayout, setArrowLayout] = useState<LayoutRectangle | null>(null);

  const handleToggle = useCallback(
    (value: boolean) => {
      if (value) {
        triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
          setTriggerPosition({ width, pageX, pageY, height });
        });
      } else {
        setTriggerPosition(null);
        setContentLayout(null);
        setArrowLayout(null);
      }

      onToggle?.(value);
    },
    [onToggle],
  );

  const [visible, setVisible] = useControlledState(
    defaultVisible,
    controlledVisible,
    handleToggle,
  );

  const insets = useSafeAreaInsets();

  const nativePlacement = getNativePlacement(placement);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const positionStyle = useRelativePosition({
    avoidCollisions: true,
    triggerPosition,
    contentLayout,
    insets,
    align: transformAlign(align),
    alignOffset: 0,
    side: nativePlacement,
    sideOffset: offset,
  });

  // Note: We do not use hover and focus trigger, so the trigger is always press.
  const getTriggerProps = useCallback(
    (
      props: { onPress?: (event: GestureResponderEvent) => void } & Record<
        string,
        unknown
      >,
    ) => ({
      onPress: (event: GestureResponderEvent) => {
        setVisible((value) => !value);
        props.onPress?.(event);
      },
    }),
    [],
  );

  const getContentProps = useCallback(
    (
      props: { onLayout?: (event: LayoutChangeEvent) => void } & Record<
        string,
        unknown
      >,
    ) => ({
      onLayout: (event: LayoutChangeEvent) => {
        setContentLayout(event.nativeEvent.layout);

        props.onLayout?.(event);
      },
    }),
    [],
  );

  const getArrowProps = useCallback(
    (
      props: { onLayout?: (event: LayoutChangeEvent) => void } & Record<
        string,
        unknown
      >,
    ) => ({
      onLayout: (event: LayoutChangeEvent) => {
        setArrowLayout(event.nativeEvent.layout);

        props.onLayout?.(event);
      },
    }),
    [],
  );

  const arrowStyle = useMemo(() => {
    if (!contentLayout || !arrowLayout || !triggerPosition) {
      return null;
    }

    const triggerCenter = triggerPosition.pageX + triggerPosition.width / 2;
    const contentCenter = contentLayout.x + contentLayout.width / 2;
    const shift = triggerCenter - contentCenter;

    return contentLayout
      ? {
          left: contentLayout.width / 2 - arrowLayout.width / 2 + shift,
        }
      : null;
  }, [contentLayout, arrowLayout, triggerPosition]);

  return useMemo(
    () => ({
      identifier,
      visible,
      setVisible,
      placement: nativePlacement as OverlayPhysicalPlacement,
      trigger: {
        ref: triggerRef,
        getProps: getTriggerProps,
      },
      content: {
        ref: contentRef,
        getProps: getContentProps,
        style: positionStyle,
      },
      arrow: {
        ref: null,
        getProps: getArrowProps,
        style: arrowStyle,
      },
    }),
    [visible, placement, positionStyle, arrowStyle],
  );
}
