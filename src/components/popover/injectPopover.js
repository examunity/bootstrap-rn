import React from 'react';
import PropTypes from 'prop-types';
import { OverlayContainer } from '@react-native-aria/overlays';
import Overlay from '../Overlay';
import useTrigger, { TriggerPropTypes } from '../../hooks/useTrigger';
import { convertToNumber } from '../../utils';
import StyleSheet from '../../style/StyleSheet';
import Popover from './Popover';

const propTypes = {
  popover: PropTypes.shape({
    title: PropTypes.node,
    content: PropTypes.node.isRequired,
    ...TriggerPropTypes,
  }),
};

export default function injectPopover(Target) {
  const OverlayPopover = React.forwardRef((props, ref) => {
    /* eslint-disable react/prop-types */
    const {
      popover: {
        title,
        content,
        trigger = 'click',
        placement = 'right',
        ...tooltipProps
      },
      ...elementProps
    } = props;
    /* eslint-enable */

    const { visible, targetProps, targetRef, templateProps } = useTrigger(
      trigger,
      tooltipProps,
      elementProps,
      ref,
    );

    const offset = convertToNumber(StyleSheet.value('popover-arrow-height'));

    return (
      <>
        <Target {...elementProps} {...targetProps} />
        {visible && (
          <OverlayContainer>
            <Overlay
              placement={placement}
              offset={offset}
              arrowOffset={offset}
              targetRef={targetRef}
              visible={visible}
            >
              {(overlay, overlayRef) => (
                <Popover
                  {...templateProps}
                  ref={overlayRef}
                  placement={overlay.placement}
                  popper={overlay.rendered}
                  style={[
                    { opacity: overlay.rendered ? 1 : 0 },
                    overlay.overlayProps.style,
                  ]}
                  arrowStyle={overlay.arrowProps.style}
                >
                  <Popover.Arrow />
                  {title && <Popover.Header>{title}</Popover.Header>}
                  <Popover.Body>{content}</Popover.Body>
                </Popover>
              )}
            </Overlay>
          </OverlayContainer>
        )}
      </>
    );
  });

  OverlayPopover.displayName = 'Overlay(Popover)';
  OverlayPopover.propTypes = propTypes;

  return OverlayPopover;
}
