import { useState } from 'react';

export default function useToggleButton(props) {
  const { active, handlePress, ...restProps } = props;

  const [pressed, setPressed] = useState(active);

  return {
    ...restProps,
    active: pressed,
    onPress: (event) => {
      if (handlePress) handlePress(event);

      if (!event.defaultPrevented) {
        setPressed((value) => !value);
      }
    },
    accessibilityPressed: pressed,
  };
}
