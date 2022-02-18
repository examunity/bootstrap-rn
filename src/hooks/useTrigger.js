import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import useIdentifier from './useIdentifier';
import { optional, concatRefs } from '../utils';
import useControlledState from './useControlledState';

const PLACEMENTS = ['top', 'bottom', 'left', 'right'];

const TRIGGERS = [
  'click',
  'hover',
  'focus',
  'manual',
  'click hover',
  'hover click',
  'hover focus',
  'focus hover',
  'click focus',
  'focus click',
];

export const TriggerPropTypes = {
  trigger: PropTypes.oneOf(TRIGGERS),
  placement: PropTypes.oneOf(PLACEMENTS),
  offset: PropTypes.number,
  defaultVisible: PropTypes.bool,
  visible: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default function useTrigger(rawTrigger, props, elementProps, ref) {
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
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const targetRef = useRef();

  return {
    visible,
    setVisible,
    targetProps: {
      ref: concatRefs(targetRef, ref),
      ...optional(visible, { accessibilityDescribedBy: identifier }),
      onPress: (event) => {
        if (trigger.includes('click')) {
          setVisible((value) => !value);
        }

        if (onPress) {
          onPress(event);
        }
      },
      onFocus: (event) => {
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
      onBlur: (event) => {
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
      onMouseOver: (event) => {
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
      onMouseLeave: (event) => {
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
      nativeID: identifier,
    },
  };
}
