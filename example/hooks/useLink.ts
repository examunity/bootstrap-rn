import { useHref, useLinkClickHandler } from 'react-router-dom';
import type { UseActionableProps } from 'bootstrap-rn';
import type { GestureResponderEvent } from 'react-native';

const defaultHrefAttrs = {
  download: false,
  target: '_blank',
  rel: 'noopener noreferrer',
};

export default function useLink<T>(props: T & UseActionableProps) {
  const {
    to,
    external,
    replace,
    state,
    onPress: handlePress,
    ...restProps
  } = props;

  if (!to) {
    return props;
  }

  if (external) {
    return {
      role: 'link',
      href: to,
      hrefAttrs:
        typeof external === 'object'
          ? { ...defaultHrefAttrs, ...external }
          : defaultHrefAttrs,
      onPress: handlePress,
      ...restProps,
    };
  }

  const href = useHref(to);
  const internalOnClick = useLinkClickHandler(to, { replace, state });

  return {
    role: 'link',
    href,
    onPress: (event: GestureResponderEvent) => {
      if (handlePress) handlePress(event);

      if (event.defaultPrevented) {
        return;
      }

      // Argument of type 'NativeTouchEvent' is not assignable to parameter of type 'MouseEvent<HTMLAnchorElement, MouseEvent>'.
      // @ts-expect-error web native event has expected type.
      internalOnClick(event.nativeEvent);
    },
    ...restProps,
  };
}
