import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import useOverlay, { OverlayPropTypes } from '../../hooks/useOverlay';

const propTypes = {
  tooltip: PropTypes.shape({
    title: PropTypes.node.isRequired,
    ...OverlayPropTypes,
  }),
};

const defaultTrigger = Platform.OS === 'web' ? 'hover' : 'click';

export default function injectTooltip(Component) {
  const OverlayTooltip = React.forwardRef((props, ref) => {
    /* eslint-disable react/prop-types */
    const {
      tooltip: {
        title,
        trigger = defaultTrigger,
        placement = 'top',
        defaultVisible,
        visible,
        onToggle,
      },
      ...elementProps
    } = props;
    /* eslint-enable */

    const target = <Component {...elementProps} ref={ref} />;

    const template = (
      <Tooltip>
        <Tooltip.Arrow />
        <Tooltip.Inner>{title}</Tooltip.Inner>
      </Tooltip>
    );

    return useOverlay(target, template, {
      trigger,
      placement,
      defaultVisible,
      visible,
      onToggle,
    });
  });

  OverlayTooltip.displayName = 'Overlay(Tooltip)';
  OverlayTooltip.propTypes = propTypes;

  return OverlayTooltip;
}
