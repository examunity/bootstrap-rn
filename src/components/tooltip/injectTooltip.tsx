import React from 'react';
import { Portal } from '@rn-primitives/portal';
import BackdropHandler from '../helpers/BackdropHandler';
import useOverlay from '../../hooks/useOverlay';
import { normalizeNumber } from '../../style/math';
import StyleSheet from '../../style/StyleSheet';
import Tooltip from './Tooltip';
import type { ViewRef } from '../View';
import type {
  OverlayTrigger,
  OverlayPlacement,
  OverlayProps,
} from '../../types';
import { concatRefs, optional } from '../../utils';

export interface InjectTooltipProps extends OverlayProps {
  tooltip: {
    title: React.ReactNode;
    trigger?: OverlayTrigger;
    placement?: OverlayPlacement;
  };
}

export default function injectTooltip<Props>(
  Target: React.ComponentType<Props>,
) {
  const OverlayTooltip = React.forwardRef<ViewRef, Props & InjectTooltipProps>(
    (props, ref) => {
      const {
        tooltip: {
          title,
          trigger = 'hover focus',
          placement = 'top',
          ...tooltipProps
        },
        defaultVisible = false,
        visible: controlledVisible,
        onToggle = () => {},
        ...elementProps
      } = props;

      const offset = normalizeNumber(StyleSheet.value('tooltip-arrow-height'));

      const overlay = useOverlay({
        defaultVisible,
        controlledVisible,
        onToggle,
        offset,
        align: 'center',
        placement,
        trigger,
      });

      if ('maxWidth' in overlay.content.style) {
        // @ts-expect-error We remove maxWidth, because maxWidth is set as style on Tooltip component.
        delete overlay.content.style.maxWidth;
      }

      return (
        <>
          <Target
            {...(elementProps as Props)}
            {...overlay.trigger.getProps(elementProps)}
            ref={concatRefs(ref, overlay.trigger.ref)}
            {...optional(overlay.visible, {
              'aria-describedby': overlay.identifier,
            })}
          />
          {overlay.visible && (
            <Portal name={overlay.identifier}>
              <BackdropHandler
                onClose={() => {
                  overlay.setVisible(false);
                }}
              />
              <Tooltip
                {...tooltipProps}
                {...overlay.content.getProps(tooltipProps)}
                ref={overlay.content.ref}
                id={overlay.identifier}
                placement={overlay.placement}
                style={overlay.content.style}
                floating
              >
                <Tooltip.Arrow
                  {...overlay.arrow.getProps({})}
                  ref={overlay.arrow.ref}
                  style={overlay.arrow.style}
                />
                <Tooltip.Inner>{title}</Tooltip.Inner>
              </Tooltip>
            </Portal>
          )}
        </>
      );
    },
  );

  OverlayTooltip.displayName = 'Overlay(Tooltip)';

  return OverlayTooltip;
}
