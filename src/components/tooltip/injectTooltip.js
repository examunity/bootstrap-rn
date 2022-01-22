import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import Tooltip from './Tooltip';
import useOverlay, { OverlayPropTypes } from '../../hooks/useOverlay';

const propTypes = {
  tooltip: PropTypes.shape({
    title: PropTypes.node.isRequired,
    ...OverlayPropTypes,
  }),
};

export default function injectTooltip(Component) {
  const OverlayTooltip = React.forwardRef((props, ref) => {
    /* eslint-disable react/prop-types */
    const {
      tooltip: {
        title,
        trigger = 'click',
        placement = 'top',
        defaultVisible,
        visible,
        onToggle,
      },
      ...elementProps
    } = props;
    /* eslint-enable */

    const target = <Component {...elementProps} ref={ref} />;

    const template = <Tooltip>{title}</Tooltip>;

    return useOverlay(target, template, {
      trigger,
      placement,
      defaultVisible,
      visible,
      onToggle,
      arrowStyle: {
        backgroundColor: StyleSheet.value('tooltip-arrow-color'),
      },
    });
  });

  OverlayTooltip.displayName = 'Overlay(Tooltip)';
  OverlayTooltip.propTypes = propTypes;

  return OverlayTooltip;
}
