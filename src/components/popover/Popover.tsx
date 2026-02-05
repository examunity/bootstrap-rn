import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import View, { ViewProps, ViewRef } from '../View';
import PopoverArrow from './PopoverArrow';
import PopoverHeader from './PopoverHeader';
import PopoverBody from './PopoverBody';
import PopoverContext from './PopoverContext';
import type { OverlayPhysicalPlacement } from '../../types';

export interface PopoverProps extends ViewProps {
  placement?: OverlayPhysicalPlacement;
  floating?: boolean;
}

const styles = StyleSheet.create({
  '.popover': css`
    position: absolute;
    // top: 0;
    // left: 0 #{"/* rtl:ignore */"};
    // z-index: $zindex-popover;
    // display: block;
    max-width: $popover-max-width;
    background-color: $popover-bg;
    // background-clip: padding-box;
    border: $popover-border-width solid $popover-border-color;
    border-radius: $popover-border-radius;
    // @include box-shadow($popover-box-shadow);
  `,
  '.popover --text': css`
    // Our parent element can be arbitrary since tooltips are by default inserted as a sibling of their target element.
    // So reset our font and text properties to avoid inheriting weird values.
    // @include reset-text();
    font-size: $popover-font-size;
    // Allow breaking very long words so they don't overflow the popover's bounds
    // word-wrap: break-word;
  `,
});

const Popover = React.forwardRef<ViewRef, PopoverProps>((props, ref) => {
  const {
    children,
    placement = 'right',
    floating,
    style,
    textStyle,
    ...elementProps
  } = props;

  const popover = useMemo(
    () => ({
      placement,
      floating,
    }),
    [placement, floating],
  );

  const classes = getStyles(styles, ['.popover']);
  const textClasses = getStyles(styles, ['.popover --text']);

  // Accessiblity role tooltip is only supported on web.
  const role = Platform.OS === 'web' ? 'tooltip' : undefined;

  return (
    <View
      {...elementProps}
      ref={ref}
      role={role}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      <PopoverContext.Provider value={popover}>
        {children}
      </PopoverContext.Provider>
    </View>
  );
});

Popover.displayName = 'Popover';

export default Object.assign(Popover, {
  Arrow: PopoverArrow,
  Header: PopoverHeader,
  Body: PopoverBody,
});
