import { type HTMLProps, useId, useMemo, useRef } from 'react';
import { I18nManager } from 'react-native';
import {
  useFloating,
  arrow,
  flip,
  shift,
  offset as applyOffset,
  autoUpdate,
  useDismiss,
  useClick,
  useFocus,
  useHover,
  useInteractions,
  type Placement,
  type UseInteractionsReturn,
} from '@floating-ui/react';
import useControlledState from './useControlledState';
import type {
  OverlayPhysicalPlacement,
  OverlayTrigger,
  OverlayAlignment,
  OverlayPlacement,
} from '../types';
import { optional } from '../utils';

type UseOverlayOptions = {
  defaultVisible: boolean;
  controlledVisible: boolean | undefined;
  onToggle: (value: boolean) => void;
  offset: number;
  align: OverlayAlignment;
  placement: OverlayPlacement;
  trigger?: OverlayTrigger;
};

const transformPlacement = (placement: OverlayPlacement) => {
  if (placement === 'start') {
    return I18nManager.isRTL ? 'right' : 'left';
  }

  if (placement === 'end') {
    return I18nManager.isRTL ? 'left' : 'right';
  }

  return placement;
};

const getAlignedPlacement = (
  placement: OverlayPlacement,
  align: OverlayAlignment,
) => {
  const transformedPlacement = transformPlacement(placement);

  if (align === 'center') {
    return transformedPlacement;
  }

  return `${transformedPlacement}-${align}` as Placement;
};

const transformReferenceProps =
  (handle: UseInteractionsReturn['getReferenceProps']) =>
  (props: HTMLProps<Element> | undefined) => {
    const { onClick, ...referenceProps } = handle(props);

    return { ...referenceProps, onPress: onClick };
  };

export default function useOverlay({
  defaultVisible,
  controlledVisible,
  onToggle: handleToggle,
  offset,
  align,
  placement,
  trigger = 'press',
}: UseOverlayOptions) {
  const identifier = useId();

  const [visible, setVisible] = useControlledState(
    defaultVisible,
    controlledVisible,
    handleToggle,
  );

  const arrowRef = useRef(null);
  const alignedPlacement = getAlignedPlacement(placement, align);

  const floating = useFloating({
    open: visible,
    onOpenChange: setVisible,
    placement: alignedPlacement,
    middleware: [
      arrow({
        element: arrowRef,
      }),
      applyOffset({ mainAxis: offset }),
      flip({
        fallbackPlacements:
          placement === 'top' || placement === 'bottom'
            ? [
                getAlignedPlacement('top', align),
                getAlignedPlacement('bottom', align),
                'right',
                'left',
              ]
            : [
                getAlignedPlacement('right', align),
                getAlignedPlacement('left', align),
                'top',
                'bottom',
              ],
      }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const interactions = trigger.split(' ');

  const click = useClick(floating.context, {
    enabled: interactions.includes('press'),
  });

  const focus = useFocus(floating.context, {
    enabled: interactions.includes('focus'),
  });
  const hover = useHover(floating.context, {
    enabled: interactions.includes('hover'),
  });
  const dismiss = useDismiss(floating.context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    focus,
    hover,
    dismiss,
  ]);

  const arrowTransformStyle = useMemo(() => {
    const arrowData = floating.context.middlewareData.arrow;
    const shiftData = floating.context.middlewareData.shift;

    if (!arrowData || (!arrowData.x && !arrowData.y)) {
      return null;
    }

    const side = floating.placement.split('-')[0] as OverlayPhysicalPlacement;
    const isVerticalSide = side === 'top' || side === 'bottom';

    const x = isVerticalSide ? (arrowData.x || 0) - (shiftData?.x || 0) : 0;
    const y = !isVerticalSide ? (arrowData.y || 0) - (shiftData?.y || 0) : 0;

    return `translate(${x < 0 ? 0 : x}px, ${y < 0 ? 0 : y}px)`;
  }, [
    floating.context.middlewareData.arrow,
    floating.context.middlewareData.shift,
    floating.placement,
  ]);

  return useMemo(
    () => ({
      identifier,
      visible,
      setVisible,
      placement: floating.placement.split('-')[0] as OverlayPhysicalPlacement,
      trigger: {
        ref: floating.refs.setReference,
        getProps: transformReferenceProps(getReferenceProps),
      },
      content: {
        ref: floating.refs.setFloating,
        getProps: getFloatingProps,
        style: floating.floatingStyles,
      },
      arrow: {
        ref: arrowRef,
        getProps: () => {},
        style: {
          position: 'absolute',
          ...optional(arrowTransformStyle !== null, {
            transform: arrowTransformStyle,
          }),
        },
      },
    }),
    [visible, floating.placement, floating.floatingStyles, arrowTransformStyle],
  );
}
