import React from 'react';
import { Platform } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View, { ViewProps, ViewRef } from '../View';
import { getStyles, each } from '../../utils';
import { THEME_COLORS } from '../../theme/proxies';
import { shiftColor } from '../../theme/functions';
import useForcedContext from '../../hooks/useForcedContext';
import ListContext from '../helpers/ListContext';
import ListGroupContext from './ListGroupContext';
import type { ThemeVariables } from '../../types';

export interface ListGroupItemProps extends ViewProps {
  color?: keyof typeof THEME_COLORS;
  active?: boolean;
  disabled?: boolean;
}

export const styles = StyleSheet.create({
  '.list-group-item': css`
    position: relative;
    // display: block;
    padding: $list-group-item-padding-y $list-group-item-padding-x;
    background-color: $list-group-bg;
    border: $list-group-border-width solid $list-group-border-color;
  `,
  '.list-group-item --text': css`
    color: $list-group-color;
    text-decoration: none; // if($link-decoration == none, null, none);
  `,
  '.list-group-item:first-child': css`
    border-top-left-radius: $list-group-border-radius;
    border-top-right-radius: $list-group-border-radius;
  `,
  '.list-group-item:last-child': css`
    border-bottom-left-radius: $list-group-border-radius;
    border-bottom-right-radius: $list-group-border-radius;
  `,
  '.list-group-item.disabled': css`
    pointer-events: none;
    background-color: $list-group-disabled-bg;
  `,
  '.list-group-item.disabled --text': css`
    color: $list-group-disabled-color;
  `,
  '.list-group-item.active': css`
    z-index: 2; // Place active items above their siblings for proper border styling
    background-color: $list-group-active-bg;
    border-color: $list-group-active-border-color;
  `,
  '.list-group-item.active --text': css`
    color: $list-group-active-color;
  `,
  '.list-group-item + .list-group-item': css`
    border-top-width: 0;
  `,
  '.list-group-item + .list-group-item.active': css`
    margin-top: -$list-group-border-width;
    border-top-width: $list-group-border-width;
  `,
  '.list-group-item-flush': css`
    border-top-left-radius: 0; // added for bootstrap-rn
    border-top-right-radius: 0; // added for bootstrap-rn
    border-bottom-left-radius: 0; // added for bootstrap-rn
    border-bottom-right-radius: 0; // added for bootstrap-rn
    border-top-width: 0;
    border-right-width: 0;
    border-bottom-width: $list-group-border-width;
    border-left-width: 0;
  `,
  '.list-group-item-flush:last-child': css`
    border-bottom-width: 0;
  `,
  '.list-group-item-flush + .list-group-item-flush.active': css`
    border-top-width: $list-group-border-width; // added for bootstrap-rn
  `,
  ...each(THEME_COLORS, (state, value) => ({
    [`.list-group-item-${state}`]: css`
      background-color: ${shiftColor(
        value,
        (t: ThemeVariables) => t['list-group-item-bg-scale'],
      )};
    `,
    [`.list-group-item-${state} --text`]: css`
      color: ${shiftColor(
        value,
        (t: ThemeVariables) => t['list-group-item-color-scale'],
      )};
    `,
  })),
});

const ListGroupItem = React.forwardRef<ViewRef, ListGroupItemProps>(
  (props, ref) => {
    const {
      children,
      color,
      active = false,
      disabled = false,
      style,
      textStyle,
      ...elementProps
    } = props;

    const { first, last } = useForcedContext(ListContext);
    const { flush } = useForcedContext(ListGroupContext);

    const classes = getStyles(styles, [
      '.list-group-item',
      first && '.list-group-item:first-child',
      last && '.list-group-item:last-child',
      active && '.list-group-item.active',
      disabled && '.list-group-item.disabled',
      !first && '.list-group-item + .list-group-item',
      !first && active && '.list-group-item + .list-group-item.active',
      flush && '.list-group-item-flush',
      flush && last && '.list-group-item-flush:last-child',
      !first &&
        flush &&
        active &&
        '.list-group-item-flush + .list-group-item-flush.active',
      color && `.list-group-item-${color}`,
    ]);

    const textClasses = getStyles(styles, [
      '.list-group-item --text',
      active && '.list-group-item.active --text',
      disabled && '.list-group-item.disabled --text',
      color && `.list-group-item-${color} --text`,
    ]);

    const role = Platform.OS === 'web' ? 'listitem' : undefined;

    return (
      <View
        {...elementProps}
        ref={ref}
        role={role}
        style={[classes, style]}
        textStyle={[textClasses, textStyle]}
      >
        {children}
      </View>
    );
  },
);

ListGroupItem.displayName = 'ListGroupItem';

export default ListGroupItem;
