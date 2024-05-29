import { useState, useMemo } from 'react';
import { useFocusRing } from '@react-native-aria/focus';

export type UseInteractionStateProps = {
  onFocus?: (event: unknown) => void;
  onBlur?: (event: unknown) => void;
  onHoverIn?: (event: unknown) => void;
  onHoverOut?: (event: unknown) => void;
  onPressIn?: (event: unknown) => void;
  onPressOut?: (event: unknown) => void;
  autoFocus?: boolean;
};

interface InteractionState {
  hover: boolean;
  focus: boolean;
  focusVisible: boolean;
  active: boolean;
}

interface FocusRingOutput {
  isFocused: boolean;
  isFocusVisible: boolean;
  focusProps: {
    onFocus: (event: unknown) => void;
    onBlur: (event: unknown) => void;
  };
}

export default function useInteractionState({
  onFocus = () => {},
  onBlur = () => {},
  onHoverIn = () => {},
  onHoverOut = () => {},
  onPressIn = () => {},
  onPressOut = () => {},
  // autoFocus, To confirm: is this still needed
}: UseInteractionStateProps) {
  const [active, setActive] = useState(false);
  const [hover, setHovered] = useState(false);
  const {
    isFocused: focus,
    isFocusVisible: focusVisible,
    focusProps,
  } = useFocusRing() as FocusRingOutput; // { autoFocus } useFocusRing does not accept arguments

  const interactionProps = useMemo(
    () => ({
      onHoverIn(event: unknown) {
        setHovered(true);
        onHoverIn(event);
      },
      onHoverOut(event: unknown) {
        setHovered(false);
        onHoverOut(event);
      },
      onFocus(event: unknown) {
        focusProps.onFocus(event);
        onFocus(event);
      },
      onBlur(event: unknown) {
        focusProps.onBlur(event);
        onBlur(event);
      },
      onPressIn(event: unknown) {
        setActive(true);
        onPressIn(event);
      },
      onPressOut(event: unknown) {
        setActive(false);
        onPressOut(event);
      },
    }),
    [onFocus, onBlur, onHoverIn, onHoverOut, onPressIn, onPressOut, focusProps],
  );

  const interaction: InteractionState = { hover, focus, focusVisible, active };

  return { interaction, interactionProps };
}
