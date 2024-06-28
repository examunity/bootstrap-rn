import React from 'react';
import { Platform } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Pressable, { PressableRef, PressableProps } from '../Pressable';
import { getStyles, each } from '../../utils';
import { THEME_COLORS } from '../../theme/proxies';
import { shiftColor, shadeColor } from '../../theme/functions';
import useModifier from '../../hooks/useModifier';
import useForcedContext from '../../hooks/useForcedContext';
import { styles as baseStyles } from './ListGroupItem';
import ListContext from '../helpers/ListContext';
import ListGroupContext from './ListGroupContext';
import type { ThemeVariables } from '../../types';

export interface ListGroupItemActionProps extends PressableProps {
  color?: keyof typeof THEME_COLORS;
  active?: boolean;
  disabled?: boolean;
  to?: string;
}

const actionStyles = StyleSheet.create({
  '.list-group-item-action': css`
    width: 100%; // For "<button>"s (anchors become 100% by default though)

    // Hover state
    &:hover {
      z-index: 1; // Place hover/focus items above their siblings for proper border styling
      background-color: $list-group-hover-bg;
    }

    &:focus {
      z-index: 1; // Place hover/focus items above their siblings for proper border styling
      background-color: $list-group-hover-bg;
    }

    &:active {
      background-color: $list-group-action-active-bg;
    }
  `,
  '.list-group-item-action --text': css`
    color: $list-group-action-color;
    // text-align: inherit; // For "<button>"s (anchors inherit)

    // Hover state
    &:hover {
      color: $list-group-action-hover-color;
      text-decoration: none;
    }

    &:focus {
      color: $list-group-action-hover-color;
      text-decoration: none;
    }

    &:active {
      color: $list-group-action-active-color;
    }
  `,
  ...each(THEME_COLORS, (state, value) => ({
    [`.list-group-item-${state}-action`]: css`
      &:hover {
        background-color: ${shadeColor(
          shiftColor(
            value,
            (t: ThemeVariables) => t['list-group-item-bg-scale'],
          ),
          0.1,
        )};
      }

      &:focus {
        background-color: ${shadeColor(
          shiftColor(
            value,
            (t: ThemeVariables) => t['list-group-item-bg-scale'],
          ),
          0.1,
        )};
      }
    `,
    [`.list-group-item-${state}-action --text`]: css`
      &:hover {
        color: ${shiftColor(
          value,
          (t: ThemeVariables) => t['list-group-item-color-scale'],
        )};
      }

      &:focus {
        color: ${shiftColor(
          value,
          (t: ThemeVariables) => t['list-group-item-color-scale'],
        )};
      }
    `,
    [`.list-group-item-${state}-action.active`]: css`
      background-color: ${shiftColor(
        value,
        (t: ThemeVariables) => t['list-group-item-color-scale'],
      )};
      border-color: ${shiftColor(
        value,
        (t: ThemeVariables) => t['list-group-item-color-scale'],
      )};
    `,
    [`.list-group-item-${state}-action.active --text`]: css`
      color: $white;
    `,
  })),
});

const ListGroupItemAction = React.forwardRef<
  PressableRef,
  ListGroupItemActionProps
>((props, ref) => {
  const [modifierProps, modifierRef] = useModifier('useTabbable', props, ref);

  const {
    children,
    color,
    active = false,
    disabled = false,
    style,
    activeStyle,
    textStyle,
    activeTextStyle,
    ...elementProps
  } = modifierProps;

  const { first, last } = useForcedContext(ListContext);
  const { flush } = useForcedContext(ListGroupContext);

  const styles = { ...baseStyles, ...actionStyles };

  const classes = getStyles(styles, [
    '.list-group-item',
    '.list-group-item-action',
    first && '.list-group-item:first-child',
    last && '.list-group-item:last-child',
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
    color && `.list-group-item-${color}-action`,
  ]);

  const activeClasses = getStyles(styles, [
    '.list-group-item.active',
    color && `.list-group-item-${color}-action.active`,
  ]);

  const textClasses = getStyles(styles, [
    '.list-group-item --text',
    '.list-group-item-action --text',
    disabled && '.list-group-item.disabled --text',
    color && `.list-group-item-${color} --text`,
    color && `.list-group-item-${color}-action --text`,
  ]);

  const activeTextClasses = getStyles(styles, [
    '.list-group-item.active --text',
    color && `.list-group-item-${color}-action.active --text`,
  ]);

  const role = Platform.OS === 'web' ? 'listitem' : undefined;

  return (
    <Pressable
      {...elementProps}
      ref={modifierRef}
      role={role}
      active={active}
      disabled={disabled}
      style={[...classes, style]}
      activeStyle={[...activeClasses, activeStyle]}
      textStyle={[...textClasses, textStyle]}
      activeTextStyle={[...activeTextClasses, activeTextStyle]}
    >
      {children}
    </Pressable>
  );
});

ListGroupItemAction.displayName = 'ListGroupItemAction';

export default ListGroupItemAction;
