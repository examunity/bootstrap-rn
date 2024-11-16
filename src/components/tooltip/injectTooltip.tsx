import React from 'react';
import { OverlayContainer } from '@react-native-aria/overlays';
import Overlay from '../helpers/Overlay';
import BackdropHandler from '../helpers/BackdropHandler';
import useTrigger, { TriggerProps } from '../../hooks/useTrigger';
import { normalizeNumber } from '../../style/math';
import StyleSheet from '../../style/StyleSheet';
import Tooltip from './Tooltip';
import type { ViewRef } from '../View';
import type { Trigger, Axis } from '../../types';

export interface InjectTooltipProps {
  tooltip: {
    title: React.ReactNode;
    autoClose?: boolean | 'inside' | 'outside';
    trigger?: Trigger;
    placement?: Axis;
  } & TriggerProps;
}

export default function injectTooltip<Props>(
  Target: React.ComponentType<Props>,
) {
  const OverlayTooltip = React.forwardRef<ViewRef, Props & InjectTooltipProps>(
    (props, ref) => {
      const {
        tooltip: {
          title,
          autoClose = 'outside',
          trigger = 'hover focus',
          placement = 'top',
          ...tooltipProps
        },
        ...elementProps
      } = props;

      const { visible, setVisible, targetProps, targetRef, templateProps } =
        useTrigger(trigger, tooltipProps, elementProps, ref);

      const offset = normalizeNumber(StyleSheet.value('tooltip-arrow-height'));

      return (
        <>
          <Target {...(elementProps as Props)} {...targetProps} />
          {visible && (
            <OverlayContainer>
              <Overlay
                placement={placement}
                targetRef={targetRef}
                arrowOffset={offset}
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
                    <Tooltip
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
                      <Tooltip.Arrow />
                      <Tooltip.Inner>{title}</Tooltip.Inner>
                    </Tooltip>
                  </>
                )}
              </Overlay>
            </OverlayContainer>
          )}
        </>
      );
    },
  );

  OverlayTooltip.displayName = 'Overlay(Tooltip)';

  return OverlayTooltip;
}
