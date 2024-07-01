import { Linking, GestureResponderEvent } from 'react-native';
import type { RelativeRoutingType } from 'react-router';
import { useNavigate } from 'react-router-native';

interface UseLinkProps {
  to?: string;
  external?: boolean;
  relative?: RelativeRoutingType;
  replace?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state?: any;
  onPress?: (event: GestureResponderEvent) => void;
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

  const navigate = useNavigate();

  const onPress = (event: GestureResponderEvent) => {
    if (handlePress) handlePress(event);

    if (event.defaultPrevented) {
      return;
    }

    if (external) {
      Linking.openURL(to);
    } else {
      navigate(to, { replace, state });
    }
  };

  return {
    role: 'link',
    onPress,
    ...restProps,
  };
}
