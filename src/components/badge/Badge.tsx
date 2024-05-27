import React from 'react';
import type { View as BaseView } from 'react-native';
import View from '../View';
import Text from '../Text';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';

export type BadgeProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  textStyle?: unknown;
};

const styles = StyleSheet.create({
  '.badge': css`
    // display: inline-block;
    padding: $badge-padding-y $badge-padding-x;
    border-radius: $badge-border-radius;
    // @include gradient-bg();
  `,
  '.badge --text': css`
    font-size: $badge-font-size;
    font-weight: $badge-font-weight;
    line-height: $badge-font-size * 1;
    color: $badge-color;
    text-align: center;
    // white-space: nowrap;
    vertical-align: middle; // baseline;
  `,
});

const Badge = React.forwardRef<BaseView, BadgeProps>((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.badge']);
  const textClasses = getStyles(styles, ['.badge --text']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      <Text style={[textClasses, textStyle]}>{children}</Text>
    </View>
  );
});

Badge.displayName = 'Badge';

export default Badge;
