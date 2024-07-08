import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Text from '../Text';
import View, { ViewProps, ViewRef } from '../View';
import { getStyles } from '../../utils';
import useForcedContext from '../../hooks/useForcedContext';
import ProgressContext from './ProgressContext';

export interface ProgressBarProps extends ViewProps {
  value: number;
}

const styles = StyleSheet.create({
  '.progress-bar': css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    background-color: $progress-bar-bg;
    // @include transition($progress-bar-transition);
  `,
  '.progress-bar --text': css`
    color: $progress-bar-color;
    text-align: center;
    // white-space: nowrap;
  `,
});

const ROUND_PRECISION = 1000;

const getPercentage = (value: number, min: number, max: number) => {
  const percentage = ((value - min) / (max - min)) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
};

const ProgressBar = React.forwardRef<ViewRef, ProgressBarProps>(
  (props, ref) => {
    const { children, value, style, textStyle, ...elementProps } = props;

    const { min, max } = useForcedContext(ProgressContext);

    const classes = getStyles(styles, ['.progress-bar']);

    const textClasses = getStyles(styles, ['.progress-bar --text']);

    // composite component
    return (
      <View
        {...elementProps}
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        style={[
          classes,
          style,
          { width: `${getPercentage(value, min, max)}%` },
        ]}
      >
        {children && <Text style={[textClasses, textStyle]}>{children}</Text>}
      </View>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
