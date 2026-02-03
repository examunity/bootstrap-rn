import { useState, useMemo } from 'react';
import type {
  MouseEvent,
  GestureResponderEvent,
  FocusEvent,
  BlurEvent,
} from 'react-native';
import useFocusRing from './useFocusRing';

type InteractionProps = {
  onFocus?: null | ((event: FocusEvent) => void) | undefined;
  onBlur?: null | ((event: BlurEvent) => void) | undefined;
  onHoverIn?: null | ((event: MouseEvent) => void) | undefined;
  onHoverOut?: null | ((event: MouseEvent) => void) | undefined;
  onPressIn?: null | ((event: GestureResponderEvent) => void) | undefined;
  onPressOut?: null | ((event: GestureResponderEvent) => void) | undefined;
  autoFocus?: boolean;
};

export default function useInteractionState({
  onFocus,
  onBlur,
  onHoverIn,
  onHoverOut,
  onPressIn,
  onPressOut,
  autoFocus,
}: InteractionProps) {
  const [active, setActive] = useState(false);
  const [hover, setHovered] = useState(false);

  const focusRingProps = useFocusRing({ autoFocus });

  const {
    isFocused: focus,
    isFocusVisible: focusVisible,
    focusProps,
  } = focusRingProps;

  const interactionProps = useMemo(
    () => ({
      onHoverIn(event: MouseEvent) {
        setHovered(true);
        onHoverIn?.(event);
      },
      onHoverOut(event: MouseEvent) {
        setHovered(false);
        onHoverOut?.(event);
      },
      onFocus(event: FocusEvent) {
        // @ts-expect-error We can use the native event for a web prop here.
        focusProps.onFocus?.(event);
        onFocus?.(event);
      },
      onBlur(event: BlurEvent) {
        // @ts-expect-error We can use the native event for a web prop here.
        focusProps.onBlur?.(event);
        onBlur?.(event);
      },
      onPressIn(event: GestureResponderEvent) {
        setActive(true);
        onPressIn?.(event);
      },
      onPressOut(event: GestureResponderEvent) {
        setActive(false);
        onPressOut?.(event);
      },
    }),
    [onFocus, onBlur, onHoverIn, onHoverOut, onPressIn, onPressOut, focusProps],
  );

  const interaction = { hover, focus, focusVisible, active };

  return { interaction, interactionProps };
}
