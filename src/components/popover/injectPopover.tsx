import React from 'react';
import useOverlay from '../../hooks/useOverlay';
import { normalizeNumber } from '../../style/math';
import StyleSheet from '../../style/StyleSheet';
import Floating from '../helpers/Floating';
import Popover from './Popover';
import type { ViewRef } from '../View';
import type {
  OverlayTrigger,
  OverlayPlacement,
  OverlayProps,
} from '../../types';
import { concatRefs, optional } from '../../utils';

export interface InjectPopoverProps extends OverlayProps {
  popover: {
    title?: React.ReactNode;
    content: React.ReactNode;
    trigger?: OverlayTrigger;
    placement?: OverlayPlacement;
  };
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
          trigger = 'press',
          placement = 'right',
          ...popoverProps
        },
        defaultVisible = false,
        visible: controlledVisible,
        onToggle = () => {},
        ...elementProps
      } = props;

      const offset = normalizeNumber(StyleSheet.value('popover-arrow-height'));

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
        // @ts-expect-error We remove maxWidth, because maxWidth is set as style on Popover component.
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
            <Floating
              id={overlay.identifier}
              onClose={() => {
                overlay.setVisible(false);
              }}
            >
              <Popover
                {...popoverProps}
                {...overlay.content.getProps(popoverProps)}
                ref={overlay.content.ref}
                id={overlay.identifier}
                placement={overlay.placement}
                style={overlay.content.style}
                floating
              >
                <Popover.Arrow
                  {...overlay.arrow.getProps({})}
                  ref={overlay.arrow.ref}
                  style={overlay.arrow.style}
                />
                {title && <Popover.Header>{title}</Popover.Header>}
                <Popover.Body>{content}</Popover.Body>
              </Popover>
            </Floating>
          )}
        </>
      );
    },
  );

  OverlayPopover.displayName = 'Overlay(Popover)';

  return OverlayPopover;
}
