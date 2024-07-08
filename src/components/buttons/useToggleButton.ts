import type { GestureResponderEvent } from 'react-native';
import { useState } from 'react';

export interface UseToggleButtonProps {
  active?: boolean;
  onPress?: null | ((event: GestureResponderEvent) => void);
}

export default function useToggleButton<T>(props: UseToggleButtonProps & T) {
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
