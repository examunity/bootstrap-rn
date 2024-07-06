import { useHref, useLinkClickHandler } from 'react-router-dom';
import type { RelativeRoutingType } from 'react-router';
import { GestureResponderEvent } from 'react-native';

const defaultHrefAttrs = {
  download: false,
  target: '_blank',
  rel: 'noopener noreferrer',
};

interface UseLinkProps {
  to?: string;
  external?: boolean | typeof defaultHrefAttrs;
  relative?: RelativeRoutingType;
  replace?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state?: any;
  onPress?: (event: GestureResponderEvent) => void;
  role?: string;
}

export default function useLink(props: UseLinkProps) {
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
