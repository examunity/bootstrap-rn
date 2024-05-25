import { useState } from 'react';

interface ToggleButtonProps {
  active?: boolean;
  handlePress?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: any;
}

export default function useToggleButton(props: ToggleButtonProps) {
  const { active = false, handlePress, ...restProps } = props;

  const [pressed, setPressed] = useState(active);

  return {
    ...restProps,
    active: pressed,
    onPress: (event: React.MouseEvent<HTMLButtonElement>) => {
      if (handlePress) handlePress(event);

      setPressed((value) => !value);
    },
    'aria-pressed': pressed,
  };
}
