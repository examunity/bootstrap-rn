import React, { useMemo, useEffect } from 'react';
import { Animated, Easing, Platform } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { THEME_COLORS } from '../../theme/proxies';
import { getStyles, each } from '../../utils';

type SpinnerVariant = 'border' | 'grow';

export type SpinnerProps = {
  variant?: SpinnerVariant;
  color?: keyof typeof THEME_COLORS;
  size?: 'sm';
  style?: React.CSSProperties;
};

const styles = StyleSheet.create({
  '.spinner-border': css`
    // display: inline-block;
    width: $spinner-width;
    height: $spinner-height;
    // vertical-align: $spinner-vertical-align;
    border-width: $spinner-border-width;
    border-style: solid;
    border-top-color: $body-color;
    border-bottom-color: $body-color;
    border-left-color: $body-color;
    // workaround for issue https://github.com/facebook/react-native/issues/34722
    border-right-color: rgba(0, 0, 0, 0.01); // transparent;
    border-radius: $spinner-width * 50%;
    // animation: $spinner-animation-speed linear infinite spinner-border;
  `,
  ...each(THEME_COLORS, (color, value) => ({
    [`.spinner-border-${color}`]: css`
      border-top-color: ${value};
      border-bottom-color: ${value};
      border-left-color: ${value};
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
    border-radius: $spinner-width * 50%;
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

const getAnimationStyle = (
  variant: SpinnerVariant,
  animation: Animated.Value,
) => {
  switch (variant) {
    case 'border':
      return {
        transform:
          Platform.OS === 'web'
            ? animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['rotate(0deg)', 'rotate(360deg)'],
              })
            : [
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
        transform:
          Platform.OS === 'web'
            ? animation.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ['scale(0)', 'scale(1)', 'scale(1)'],
              })
            : [
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

const Spinner = React.forwardRef<ViewRef, SpinnerProps>((props, ref) => {
  const { variant = 'border', color, size, style, ...elementProps } = props;

  const classes = getStyles(styles, [
    `.spinner-${variant}`,
    color && `.spinner-${variant}-${color}`,
    size === 'sm' && `.spinner-${variant}-sm`,
  ]);

  const role = Platform.OS === 'web' ? 'status' : undefined;

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
      role={role}
      aria-hidden
      style={[classes, getAnimationStyle(variant, animation), style]}
    />
  );
});

Spinner.displayName = 'Spinner';

export default Spinner;
