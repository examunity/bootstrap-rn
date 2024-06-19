import React, { useContext, forwardRef } from 'react';
import { I18nManager, StyleSheet as StyleUtils } from 'react-native';
import View from './View';
import StyleSheet from '../style/StyleSheet';
import { getStyles } from '../utils';
import css from '../style/css';
import TextStyleContext, {
  TextStyleContextType,
} from '../style/TextStyleContext';

export const CARET_DIRECTIONS = ['up', 'down', 'start', 'end'] as const;

type CaretDirectionTypes = (typeof CARET_DIRECTIONS)[number];

export interface CaretProps extends ViewProps {
  color?: string;
  direction?: CaretDirectionTypes;
}

const getColor = (context: TextStyleContextType | null): string => {
  if (context && context.style) {
    const flattenedStyle = StyleUtils.flatten(context.style);

    if (flattenedStyle.color) {
      return flattenedStyle.color;
    }
  }

  return StyleSheet.value('body-color');
};

const getBorderColorStyle = (color: string, direction: CaretDirectionTypes) => {
  switch (direction) {
    case 'down':
      return { borderTopColor: color };
    case 'up':
      return { borderBottomColor: color };
    case 'end':
      return I18nManager.isRTL
        ? { borderRightColor: color }
        : { borderLeftColor: color };
    case 'start':
      return I18nManager.isRTL
        ? { borderLeftColor: color }
        : { borderRightColor: color };
    default:
      throw new Error('Unknown direction.');
  }
};

const styles = StyleSheet.create({
  caret: css`
    margin-left: $caret-spacing;
    align-self: center;
  `,
  'caret-down': css`
    border-top-width: $caret-width;
    border-right-width: $caret-width;
    border-right-color: transparent;
    border-bottom-width: 0;
    border-left-width: $caret-width;
    border-left-color: transparent;
  `,
  'caret-up': css`
    border-top-width: 0;
    border-right-width: $caret-width;
    border-right-color: transparent;
    border-bottom-width: $caret-width;
    border-left-width: $caret-width;
    border-left-color: transparent;
  `,
  'caret-end': css`
    border-top-width: $caret-width;
    border-top-color: transparent;
    border-right-width: 0;
    border-bottom-width: $caret-width;
    border-bottom-color: transparent;
    border-left-width: $caret-width;
  `,
  'caret-start': css`
    margin-left: 0;
    margin-right: $caret-spacing;
    border-top-width: $caret-width;
    border-top-color: transparent;
    border-right-width: $caret-width;
    border-bottom-width: $caret-width;
    border-bottom-color: transparent;
  `,
});

const Caret = forwardRef<ViewRef, CaretProps>((props, ref) => {
  const { color, direction = 'down', style, ...elementProps } = props;

  const context = useContext(TextStyleContext) as TextStyleContextType;

  const classes = getStyles(styles, ['caret', `caret-${direction}`]);

  return (
    <View
      {...elementProps}
      ref={ref}
      style={[
        classes,
        getBorderColorStyle(color || getColor(context), direction),
        style,
      ]}
    />
  );
});

Caret.displayName = 'Caret';

export default Caret;
