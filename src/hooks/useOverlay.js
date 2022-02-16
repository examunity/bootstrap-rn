import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { OverlayContainer } from '@react-native-aria/overlays';
import Overlay from '../components/Overlay';
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

export const OverlayPropTypes = {
  trigger: PropTypes.oneOf(TRIGGERS),
  placement: PropTypes.oneOf(PLACEMENTS),
  offset: PropTypes.number,
  defaultVisible: PropTypes.bool,
  visible: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default function useOverlay(target, template, config) {
  const {
    trigger: rawTrigger,
    placement: rawPlacement,
    offset,
    defaultVisible = false,
    visible: controlledVisible,
    onToggle,
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

  const targetRef = useRef();

  const targetElement = React.cloneElement(target, {
    key: 'target',
    ref: concatRefs(targetRef, target.ref),
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

  return (
    <>
      {targetElement}
      {visible && (
        <OverlayContainer>
          <Overlay
            placement={rawPlacement}
            targetRef={targetRef}
            offset={offset}
            visible={visible}
          >
            {({ overlayProps, arrowProps, placement, rendered }, templateRef) =>
              React.cloneElement(template, {
                nativeID: identifier,
                ref: concatRefs(templateRef, template.ref),
                placement,
                style: [
                  template.style,
                  { opacity: rendered ? 1 : 0 },
                  overlayProps.style,
                ],
                arrowStyle: arrowProps.style,
              })
            }
          </Overlay>
        </OverlayContainer>
      )}
    </>
  );
}
