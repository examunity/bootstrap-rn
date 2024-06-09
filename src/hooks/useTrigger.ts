import { useState, useRef, ForwardedRef, MouseEvent } from 'react';
import {
  Platform,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  GestureResponderEvent,
} from 'react-native';
import useIdentifier from './useIdentifier';
import { optional, concatRefs } from '../utils';
import useControlledState from './useControlledState';

const PLACEMENTS = ['top', 'bottom', 'left', 'right'] as const;

const TRIGGERS = [
  'press',
  'hover',
  'focus',
  'manual',
  'press hover',
  'hover press',
  'hover focus',
  'focus hover',
  'press focus',
  'focus press',
] as const;

type Placement = (typeof PLACEMENTS)[number];
type Trigger = (typeof TRIGGERS)[number];

export type TriggerProps = {
  trigger: Trigger;
  placement?: Placement;
  offset?: number;
  defaultVisible?: boolean;
  visible?: boolean;
  onToggle?: (visible: boolean) => void;
};

interface ElementProps {
  onPress?: (event: GestureResponderEvent) => void;
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onMouseOver?: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function useTrigger<T>(
  rawTrigger: string,
  props: TriggerProps,
  elementProps: ElementProps,
  ref: ForwardedRef<T>,
) {
  const {
    defaultVisible = false,
    visible: controlledVisible,
    onToggle,
  } = props;

  const { onPress, onFocus, onBlur, onMouseOver, onMouseLeave } = elementProps;

  const trigger = rawTrigger.split(' ');

  const identifier = useIdentifier('overlay');
  const [visible, setVisible] = useControlledState(
    defaultVisible,
    controlledVisible,
    onToggle,
  );
  const [focused, setFocused] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);

  const targetRef = useRef();

  return {
    visible,
    setVisible,
    targetProps: {
      ref: concatRefs(targetRef, ref),
      ...optional(visible, { 'aria-describedby': identifier }),
      onPress: (event: GestureResponderEvent) => {
        const handleHoverAsPress =
          (Platform.OS === 'android' || Platform.OS === 'ios') &&
          trigger.includes('hover');

        if (trigger.includes('press') || handleHoverAsPress) {
          setVisible((value) => !value);
        }

        if (onPress) {
          onPress(event);
        }
      },
      onFocus: (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (trigger.includes('focus')) {
          setFocused(true);

          if (!visible) {
            setVisible(true);
          }
        }

        if (onFocus) {
          onFocus(event);
        }
      },
      onBlur: (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (trigger.includes('focus')) {
          setFocused(false);

          const activeHoverTrigger = trigger.includes('hover') && hovered;
          if (visible && !activeHoverTrigger) {
            setVisible(false);
          }
        }

        if (onBlur) {
          onBlur(event);
        }
      },
      onMouseOver: (event: MouseEvent<HTMLButtonElement>) => {
        if (trigger.includes('hover')) {
          setHovered(true);

          if (!visible && !focused) {
            setVisible(true);
          }
        }

        if (onMouseOver) {
          onMouseOver(event);
        }
      },
      onMouseLeave: (event: MouseEvent<HTMLButtonElement>) => {
        if (trigger.includes('hover')) {
          setHovered(false);

          const activeFocusTrigger = trigger.includes('focus') && focused;
          if (visible && !activeFocusTrigger) {
            setVisible(false);
          }
        }

        if (onMouseLeave) {
          onMouseLeave(event);
        }
      },
    },
    targetRef,
    templateProps: {
      id: identifier,
    },
  };
}
