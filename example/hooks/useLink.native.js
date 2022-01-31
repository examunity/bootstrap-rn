import { Linking } from 'react-native';
import { useNavigate } from 'react-router-native';

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

  const navigate = useNavigate();

  const onPress = (event) => {
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
    accessibilityRole: 'link',
    onPress,
    ...restProps,
  };
}
