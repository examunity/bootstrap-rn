import { useState, useMemo } from 'react';
import { useFocusRing } from '@react-native-aria/focus';

export default function useInteractionState({
  onFocus = () => {},
  onBlur = () => {},
  onHoverIn = () => {},
  onHoverOut = () => {},
  onPressIn = () => {},
  onPressOut = () => {},
  autoFocus,
}) {
  const [active, setActive] = useState(false);
  const [hover, setHovered] = useState(false);
  const {
    isFocused: focus,
    isFocusVisible: focusVisible,
    focusProps,
  } = useFocusRing({ autoFocus });

  const interactionProps = useMemo(
    () => ({
      onHoverIn(event) {
        setHovered(true);
        onHoverIn(event);
      },
      onHoverOut(event) {
        setHovered(false);
        onHoverOut(event);
      },
      onFocus(event) {
        focusProps.onFocus(event);
        onFocus(event);
      },
      onBlur(event) {
        focusProps.onBlur(event);
        onBlur(event);
      },
      onPressIn(event) {
        setActive(true);
        onPressIn(event);
      },
      onPressOut(event) {
        setActive(false);
        onPressOut(event);
      },
    }),
    [onFocus, onBlur, onHoverIn, onHoverOut, onPressIn, onPressOut],
  );

  const interaction = { hover, focus, focusVisible, active };

  return { interaction, interactionProps };
}
