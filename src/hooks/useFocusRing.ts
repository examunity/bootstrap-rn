import type { AriaFocusRingProps, FocusRingAria } from '@react-aria/focus';

export default function useFocusRing(
  // @ts-expect-error Argument props is used on web only
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  props?: AriaFocusRingProps,
): FocusRingAria {
  return {
    isFocused: false,
    isFocusVisible: false,
    focusProps: {},
  };
}
