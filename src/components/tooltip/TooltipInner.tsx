import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import View, { ViewProps, ViewRef } from '../View';
import Text from '../Text';

export interface TooltipInnerProps extends ViewProps {}

const styles = StyleSheet.create({
  '.tooltip-inner': css`
    max-width: $tooltip-max-width;
    padding: $tooltip-padding-y $tooltip-padding-x;
    background-color: $tooltip-bg;
    border-radius: $tooltip-border-radius;
  `,
  '.tooltip-inner --text': css`
    color: $tooltip-color;
    text-align: center;
  `,
});

const TooltipInner = React.forwardRef<ViewRef, TooltipInnerProps>(
  (props, ref) => {
    const { children, style, textStyle, ...elementProps } = props;

    const classes = getStyles(styles, ['.tooltip-inner']);
    const textClasses = getStyles(styles, ['.tooltip-inner --text']);

    // composite component
    return (
      <View {...elementProps} ref={ref} style={[classes, style]}>
        <Text style={[textClasses, textStyle]}>{children}</Text>
      </View>
    );
  },
);

TooltipInner.displayName = 'TooltipInner';

export default TooltipInner;
