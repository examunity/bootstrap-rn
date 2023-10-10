import { useHref, useLinkClickHandler } from 'react-router-dom';

const defaultHrefAttrs = {
  download: false,
  target: '_blank',
  rel: 'noopener noreferrer',
};

export default function useLink(props) {
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
      hrefAttrs: { ...defaultHrefAttrs, ...external },
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

      internalOnClick(event.nativeEvent);
    },
    ...restProps,
  };
}
