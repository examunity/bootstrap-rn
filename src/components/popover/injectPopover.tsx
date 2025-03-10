import React from 'react';
import { OverlayContainer } from '@react-native-aria/overlays';
import Overlay from '../helpers/Overlay';
import BackdropHandler from '../helpers/BackdropHandler';
import useTrigger, { TriggerProps } from '../../hooks/useTrigger';
import { normalizeNumber } from '../../style/math';
import StyleSheet from '../../style/StyleSheet';
import Popover from './Popover';
import type { ViewRef } from '../View';
import type { Trigger, Axis } from '../../types';

export interface InjectPopoverProps {
  popover: {
    title?: React.ReactNode;
    content: React.ReactNode;
    autoClose?: boolean | 'inside' | 'outside';
    trigger?: Trigger;
    placement?: Axis;
  } & TriggerProps;
}

export default function injectPopover<Props>(
  Target: React.ComponentType<Props>,
) {
  const OverlayPopover = React.forwardRef<ViewRef, Props & InjectPopoverProps>(
    (props, ref) => {
      const {
        popover: {
          title,
          content,
          autoClose = 'outside',
          trigger = 'press',
          placement = 'right',
          ...popoverProps
        },
        ...elementProps
      } = props;

      const { visible, setVisible, targetProps, targetRef, templateProps } =
        useTrigger(trigger, popoverProps, elementProps, ref);

      const offset = normalizeNumber(StyleSheet.value('popover-arrow-height'));

      return (
        <>
          <Target {...(elementProps as Props)} {...targetProps} />
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
    },
  );

  OverlayPopover.displayName = 'Overlay(Popover)';

  return OverlayPopover;
}
