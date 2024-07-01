import { useHref, useLinkClickHandler } from 'react-router-dom';
import type { RelativeRoutingType } from 'react-router';

interface UseLinkProps {
  to?: string;
  external?: boolean;
  relative?: RelativeRoutingType;
  replace?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state?: any;
  onPress?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  role?: string;
}

const defaultHrefAttrs = {
  download: false,
  target: '_blank',
  rel: 'noopener noreferrer',
  external: false,
};

export default function useLink(props: UseLinkProps): {
  role?: string;
  href?: string;
  hrefAttrs?: typeof defaultHrefAttrs;
  onPress?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
} {
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
      hrefAttrs: { ...defaultHrefAttrs, external },
      onPress: handlePress,
      ...restProps,
    };
  }

  const href = useHref(to);
  const internalOnClick = useLinkClickHandler(to, { replace, state });

  return {
    role: 'link',
    href,
    onPress: (event) => {
      if (handlePress) handlePress(event);

      if (event.defaultPrevented) {
        return;
      }

      internalOnClick(event);
    },
    ...restProps,
  };
}
