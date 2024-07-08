import { useState, useMemo } from 'react';
import type {
  TextInputFocusEventData,
  NativeSyntheticEvent,
  MouseEvent,
  GestureResponderEvent,
  TargetedEvent,
} from 'react-native';
import { useFocusRing } from '@react-native-aria/focus';

type InteractionProps = {
  onFocus?:
    | null
    | ((event: NativeSyntheticEvent<TargetedEvent>) => void)
    | undefined;
  onBlur?:
    | null
    | ((event: NativeSyntheticEvent<TargetedEvent>) => void)
    | undefined;
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

  // @ts-expect-error definition is on @react-aria/focus but not on @react-native-aria/focus
  const focusRingProps = useFocusRing({ autoFocus }) as unresolved;

  const {
    isFocused: focus,
    isFocusVisible: focusVisible,
    focusProps,
  } = focusRingProps;

  const interactionProps = useMemo(
    () => ({
      onHoverIn(event: MouseEvent) {
        setHovered(true);
        if (onHoverIn) onHoverIn(event);
      },
      onHoverOut(event: MouseEvent) {
        setHovered(false);
        if (onHoverOut) onHoverOut(event);
      },
      onFocus(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        focusProps.onFocus(event);
        if (onFocus) onFocus(event);
      },
      onBlur(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        focusProps.onBlur(event);
        if (onBlur) onBlur(event);
      },
      onPressIn(event: GestureResponderEvent) {
        setActive(true);
        if (onPressIn) onPressIn(event);
      },
      onPressOut(event: GestureResponderEvent) {
        setActive(false);
        if (onPressOut) onPressOut(event);
      },
    }),
    [onFocus, onBlur, onHoverIn, onHoverOut, onPressIn, onPressOut, focusProps],
  );

  const interaction = { hover, focus, focusVisible, active };

  return { interaction, interactionProps };
}
