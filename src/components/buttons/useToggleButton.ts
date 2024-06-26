import type { GestureResponderEvent } from 'react-native';
import { useState } from 'react';

type ToggleButtonProps = {
  active?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function useToggleButton<T>(props: ToggleButtonProps & T) {
  const { active = false, onPress: handlePress, ...restProps } = props;

  const [pressed, setPressed] = useState(active);

  return {
    ...restProps,
    active: pressed,
    onPress: (event: GestureResponderEvent) => {
      if (handlePress) handlePress(event);

      setPressed((value) => !value);
    },
    'aria-pressed': pressed,
  };
}
