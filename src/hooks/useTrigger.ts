import { useState, useRef, ForwardedRef } from 'react';
import {
  Platform,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  GestureResponderEvent,
  MouseEvent,
} from 'react-native';
import useIdentifier from './useIdentifier';
import { optional, concatRefs } from '../utils';
import useControlledState from './useControlledState';
import type { Trigger } from '../types';

export type TriggerProps = {
  offset?: number;
  defaultVisible?: boolean;
  visible?: boolean;
  onToggle?: (visible: boolean) => void;
};

export type TriggerEventProps = {
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  onFocus?:
    | null
    | ((event: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  onBlur?:
    | null
    | ((event: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  onMouseOver?: null | ((event: MouseEvent) => void) | undefined;
  onMouseLeave?: null | ((event: MouseEvent) => void) | undefined;
};

export default function useTrigger<T>(
  rawTrigger: Trigger,
  props: TriggerProps,
  elementProps: TriggerEventProps,
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

  const targetRef = useRef(null);

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
      onMouseOver: (event: MouseEvent) => {
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
      onMouseLeave: (event: MouseEvent) => {
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
