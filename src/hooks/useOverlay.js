import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-native-popover-view';
import useIdentifier from './useIdentifier';
import { optional } from '../utils';
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

export const OverlayPropTypes = {
  trigger: PropTypes.oneOf(TRIGGERS),
  placement: PropTypes.oneOf(PLACEMENTS),
  defaultVisible: PropTypes.bool,
  visible: PropTypes.bool,
  onToggle: PropTypes.func,
  arrowStyle: PropTypes.any,
};

function useOverlay(target, template, config) {
  const {
    trigger: rawTrigger,
    placement,
    defaultVisible = false,
    visible: controlledVisible,
    onToggle,
    arrowStyle,
  } = config;

  const trigger = rawTrigger.split(' ');

  const identifier = useIdentifier('overlay');
  const [visible, setVisible] = useControlledState(
    defaultVisible,
    controlledVisible,
    onToggle,
  );
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const targetElement = React.cloneElement(target, {
    key: 'target',
    ...optional(visible, { accessibilityDescribedBy: identifier }),
    onPress: (event) => {
      if (trigger.includes('click')) {
        setVisible((value) => !value);
      }

      if (target.props.onPress) {
        target.props.onPress(event);
      }
    },
    onFocus: (event) => {
      if (trigger.includes('focus')) {
        setFocused(true);

        if (!visible) {
          setVisible(true);
        }
      }

      if (target.props.onFocus) {
        target.props.onFocus(event);
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

      if (target.props.onBlur) {
        target.props.onBlur(event);
      }
    },
    onMouseOver: (event) => {
      if (trigger.includes('hover')) {
        setHovered(true);

        if (!visible && !focused) {
          setVisible(true);
        }
      }

      if (target.props.onMouseOver) {
        target.props.onMouseOver(event);
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

      if (target.props.onMouveLeave) {
        target.props.onMouseLeave(event);
      }
    },
  });

  const templateElement = React.cloneElement(template, {
    nativeID: identifier,
  });

  return (
    <Overlay
      from={targetElement}
      isVisible={visible}
      placement={placement}
      popoverStyle={{ backgroundColor: 'transparent' }}
      backgroundStyle={{ backgroundColor: 'transparent' }}
      arrowStyle={arrowStyle}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      {templateElement}
    </Overlay>
  );
}

export default useOverlay;
