import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import StyleSheet from '../../style/StyleSheet';
import TextStyleProvider from '../../style/TextStyleProvider';
import css from '../../style/css';
import Text from '../Text';
import View from '../View';
import { getStyles } from '../../utils';
import ProgressContext from './ProgressContext';

const propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
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
  const { children, value, style, ...elementProps } = props;

  const context = useContext(ProgressContext);

  invariant(
    context,
    'ProgressBar can only be used inside a Progress component.',
  );

  const classes = getStyles(styles, ['.progress-bar']);

  const textClasses = getStyles(styles, ['.progress-bar-text']);

  const { min, max } = context;

  return (
    <View
      {...elementProps}
      ref={ref}
      style={[classes, style, { width: `${getPercentage(value, min, max)}%` }]}
      accessibilityRole="progressbar"
      accessibilityValueNow={value}
      accessibilityValueMin={min}
      accessibilityValueMax={max}
    >
      <TextStyleProvider style={textClasses}>
        <Text>{children || ' '}</Text>
      </TextStyleProvider>
    </View>
  );
});

ProgressBar.displayName = 'ProgressBar';
ProgressBar.propTypes = propTypes;

export default ProgressBar;
