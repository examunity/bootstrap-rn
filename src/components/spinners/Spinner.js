import React, { useMemo, useEffect } from 'react';
import { Animated, Easing, Platform } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { THEME_COLORS } from '../../theme/proxies';
import { getStyles, each } from '../../utils';

const propTypes = {
  variant: PropTypes.oneOf(['border', 'grow']),
  color: PropTypes.oneOf(Object.keys(THEME_COLORS)),
  size: PropTypes.oneOf(['sm']),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.spinner-border': css`
    // display: inline-block;
    width: $spinner-width;
    height: $spinner-height;
    // vertical-align: $spinner-vertical-align;
    border-width: $spinner-border-width;
    border-style: solid;
    border-color: $body-color;
    border-right-color: transparent;
    border-radius: $spinner-width * 0.5; // 50%;
    // animation: $spinner-animation-speed linear infinite spinner-border;
  `,
  ...each(THEME_COLORS, (color, value) => ({
    [`.spinner-border-${color}`]: css`
      border-color: ${value};
    `,
  })),
  '.spinner-border-sm': css`
    width: $spinner-width-sm;
    height: $spinner-height-sm;
    border-width: $spinner-border-width-sm;
  `,
  '.spinner-grow': css`
    // display: inline-block;
    width: $spinner-width;
    height: $spinner-height;
    // vertical-align: $spinner-vertical-align;
    background-color: $body-color;
    border-radius: $spinner-width * 0.5; // 50%;
    opacity: 0;
    // animation: $spinner-animation-speed linear infinite spinner-grow;
  `,
  ...each(THEME_COLORS, (color, value) => ({
    [`.spinner-grow-${color}`]: css`
      background-color: ${value};
    `,
  })),
  '.spinner-grow-sm': css`
    width: $spinner-width-sm;
    height: $spinner-height-sm;
  `,
});

const AnimatedView = Animated.createAnimatedComponent(View);

const getAnimationStyle = (variant, animation) => {
  switch (variant) {
    case 'border':
      return {
        transform: [
          {
            rotate: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            }),
          },
        ],
      };
    case 'grow':
      return {
        transform: [
          {
            scale: animation.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, 1, 1],
            }),
          },
        ],
        opacity: animation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 1, 0],
        }),
      };
    default:
      throw new Error('Unknown spinner variant.');
  }
};

const Spinner = React.forwardRef((props, ref) => {
  const { variant = 'border', color, size, style, ...elementProps } = props;

  const classes = getStyles(styles, [
    `.spinner-${variant}`,
    color && `.spinner-${variant}-${color}`,
    size === 'sm' && `.spinner-${variant}-sm`,
  ]);

  const role = Platform.OS === 'web' ? 'status' : null;

  const animation = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    const duration =
      parseFloat(StyleSheet.value('spinner-animation-speed')) * 1000;

    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ).start();
  }, []);

  return (
    <AnimatedView
      {...elementProps}
      ref={ref}
      accessibilityRole={role}
      accessibilityHidden
      style={[classes, getAnimationStyle(variant, animation), style]}
    />
  );
});

Spinner.displayName = 'Spinner';
Spinner.propTypes = propTypes;

export default Spinner;
