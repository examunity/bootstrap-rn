import React from 'react';
import PropTypes from 'prop-types';
import View from '../View';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import useForcedContext from '../../hooks/useForcedContext';
import TooltipContext from './TooltipContext';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.tooltip-arrow': css`
    position: absolute;
    // display: block;
    width: $tooltip-arrow-width;
    height: $tooltip-arrow-height;
  `,
  '.tooltip-arrow-before': css`
    position: absolute;
    // content: "";
    border-top-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-style: solid;
  `,
  '.tooltip-arrow-top': css`
    bottom: 0;
  `,
  '.tooltip-arrow-top-before': css`
    top: -1px;
    border-top-width: $tooltip-arrow-height;
    border-right-width: $tooltip-arrow-width * 0.5;
    border-left-width: $tooltip-arrow-width * 0.5;
    border-bottom-width: 0;
    border-top-color: $tooltip-arrow-color;
  `,
  '.tooltip-arrow-end': css`
    left: 0;
    width: $tooltip-arrow-height;
    height: $tooltip-arrow-width;
  `,
  '.tooltip-arrow-end-before': css`
    right: -1px;
    border-top-width: $tooltip-arrow-width * 0.5;
    border-right-width: $tooltip-arrow-height;
    border-left-width: 0;
    border-bottom-width: $tooltip-arrow-width * 0.5;
    border-right-color: $tooltip-arrow-color;
  `,
  '.tooltip-arrow-bottom': css`
    top: 0;
  `,
  '.tooltip-arrow-bottom-before': css`
    bottom: -1px;
    border-top-width: 0;
    border-right-width: $tooltip-arrow-width * 0.5;
    border-left-width: $tooltip-arrow-width * 0.5;
    border-bottom-width: $tooltip-arrow-height;
    border-bottom-color: $tooltip-arrow-color;
  `,
  '.tooltip-arrow-start': css`
    right: 0;
    width: $tooltip-arrow-height;
    height: $tooltip-arrow-width;
  `,
  '.tooltip-arrow-start-before': css`
    left: -1px;
    border-top-width: $tooltip-arrow-width * 0.5;
    border-right-width: 0;
    border-left-width: $tooltip-arrow-height;
    border-bottom-width: $tooltip-arrow-width * 0.5;
    border-left-color: $tooltip-arrow-color;
  `,
});

const TooltipArrow = React.forwardRef((props, ref) => {
  const { style, ...elementProps } = props;

  const { placement, arrowStyle } = useForcedContext(TooltipContext);

  const classes = getStyles(styles, [
    '.tooltip-arrow',
    `.tooltip-arrow-${placement}`,
  ]);
  const beforeClasses = getStyles(styles, [
    '.tooltip-arrow-before',
    `.tooltip-arrow-${placement}-before`,
  ]);

  return (
    <View {...elementProps} ref={ref} style={[classes, arrowStyle, style]}>
      <View style={beforeClasses} />
    </View>
  );
});

TooltipArrow.displayName = 'TooltipArrow';
TooltipArrow.propTypes = propTypes;

export default TooltipArrow;
