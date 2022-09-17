import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Text from '../Text';
import View from '../View';
import { getStyles } from '../../utils';
import useForcedContext from '../../hooks/useForcedContext';
import ProgressContext from './ProgressContext';

const propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.progress-bar': css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    background-color: $progress-bar-bg;
    // @include transition($progress-bar-transition);
  `,
  '.progress-bar-text': css`
    color: $progress-bar-color;
    text-align: center;
    // white-space: nowrap;
  `,
});

const ROUND_PRECISION = 1000;

const getPercentage = (value, min, max) => {
  const percentage = ((value - min) / (max - min)) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
};

const ProgressBar = React.forwardRef((props, ref) => {
  const { children, value, style, textStyle, ...elementProps } = props;

  const { min, max } = useForcedContext(ProgressContext);

  const classes = getStyles(styles, ['.progress-bar']);

  const textClasses = getStyles(styles, ['.progress-bar-text']);

  // composite component
  return (
    <View
      {...elementProps}
      ref={ref}
      accessibilityRole="progressbar"
      accessibilityValueNow={value}
      accessibilityValueMin={min}
      accessibilityValueMax={max}
      style={[classes, style, { width: `${getPercentage(value, min, max)}%` }]}
    >
      {children && <Text style={[textClasses, textStyle]}>{children}</Text>}
    </View>
  );
});

ProgressBar.displayName = 'ProgressBar';
ProgressBar.propTypes = propTypes;

export default ProgressBar;
