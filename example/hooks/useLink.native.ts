import { Linking, GestureResponderEvent } from 'react-native';
import { useNavigate } from 'react-router-native';
import type { UseActionableProps } from 'bootstrap-rn';

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
    return { ...restProps };
  }

  const navigate = useNavigate();

  const onPress = (event: GestureResponderEvent) => {
    if (handlePress) handlePress(event);

    if (event.defaultPrevented) {
      return;
    }

    if (external) {
      if (typeof to === 'object') {
        throw new Error('"to" prop cannot be an object on native.');
      }

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
