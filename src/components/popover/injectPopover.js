import React from 'react';
import PropTypes from 'prop-types';
import { OverlayContainer } from '@react-native-aria/overlays';
import Overlay from '../helpers/Overlay';
import BackdropHandler from '../helpers/BackdropHandler';
import useTrigger, { TriggerPropTypes } from '../../hooks/useTrigger';
import { normalizeNumber } from '../../style/math';
import StyleSheet from '../../style/StyleSheet';
import Popover from './Popover';

const propTypes = {
  popover: PropTypes.shape({
    title: PropTypes.node,
    content: PropTypes.node.isRequired,
    autoClose: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['inside', 'outside']),
    ]),
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
        autoClose = 'outside',
        trigger = 'press',
        placement = 'right',
        ...tooltipProps
      },
      ...elementProps
    } = props;
    /* eslint-enable */

    const {
      visible,
      setVisible,
      targetProps,
      targetRef,
      templateProps,
    } = useTrigger(trigger, tooltipProps, elementProps, ref);

    const offset = normalizeNumber(StyleSheet.value('popover-arrow-height'));

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
                <>
                  <BackdropHandler
                    toggleRef={targetRef}
                    dialogRef={overlayRef}
                    onClose={() => {
                      setVisible(false);
                    }}
                    autoClose={autoClose}
                  />
                  <Popover
                    {...templateProps}
                    ref={overlayRef}
                    placement={overlay.placement}
                    popper={overlay.rendered}
                    style={[
                      overlay.overlayProps.style,
                      {
                        maxHeight: 'auto',
                        opacity: overlay.rendered ? 1 : 0,
                      },
                    ]}
                    arrowStyle={overlay.arrowProps.style}
                  >
                    <Popover.Arrow />
                    {title && <Popover.Header>{title}</Popover.Header>}
                    <Popover.Body>{content}</Popover.Body>
                  </Popover>
                </>
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
