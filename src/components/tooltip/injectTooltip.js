import React from 'react';
import PropTypes from 'prop-types';
import { OverlayContainer } from '@react-native-aria/overlays';
import Overlay from '../helpers/Overlay';
import useTrigger, { TriggerPropTypes } from '../../hooks/useTrigger';
import { convertToNumber } from '../../utils';
import StyleSheet from '../../style/StyleSheet';
import Tooltip from './Tooltip';

const propTypes = {
  tooltip: PropTypes.shape({
    title: PropTypes.node.isRequired,
    ...TriggerPropTypes,
  }),
};

export default function injectTooltip(Target) {
  const OverlayTooltip = React.forwardRef((props, ref) => {
    /* eslint-disable react/prop-types */
    const {
      tooltip: {
        title,
        trigger = 'hover focus',
        placement = 'top',
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

    const offset = convertToNumber(StyleSheet.value('tooltip-arrow-height'));

    return (
      <>
        <Target {...elementProps} {...targetProps} />
        {visible && (
          <OverlayContainer>
            <Overlay
              placement={placement}
              targetRef={targetRef}
              arrowOffset={offset}
              visible={visible}
            >
              {(overlay, overlayRef) => (
                <Tooltip
                  {...templateProps}
                  ref={overlayRef}
                  placement={overlay.placement}
                  popper={overlay.rendered}
                  style={[
                    overlay.overlayProps.style,
                    { maxHeight: 'auto', opacity: overlay.rendered ? 1 : 0 },
                  ]}
                  arrowStyle={overlay.arrowProps.style}
                >
                  <Tooltip.Arrow />
                  <Tooltip.Inner>{title}</Tooltip.Inner>
                </Tooltip>
              )}
            </Overlay>
          </OverlayContainer>
        )}
      </>
    );
  });

  OverlayTooltip.displayName = 'Overlay(Tooltip)';
  OverlayTooltip.propTypes = propTypes;

  return OverlayTooltip;
}
