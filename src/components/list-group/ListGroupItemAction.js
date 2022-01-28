import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Pressable from '../Pressable';
import { getStyles, each, optional } from '../../utils';
import { THEME_COLORS } from '../../theme/proxies';
import { shiftColor, shadeColor } from '../../theme/functions';
import useAction from '../../hooks/useAction';
import useForcedContext from '../../hooks/useForcedContext';
import { styles as baseStyles } from './ListGroupItem';
import ListGroupContext from './ListGroupContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(Object.keys(THEME_COLORS)),
  active: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

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
  '.list-group-item-action-text': css`
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
        background-color: ${(t) =>
          shadeColor(0.1, shiftColor(t['list-group-item-bg-scale'], value(t)))};
      }

      &:focus {
        background-color: ${(t) =>
          shadeColor(0.1, shiftColor(t['list-group-item-bg-scale'], value(t)))};
      }
    `,
    [`.list-group-item-${state}-action-text`]: css`
      &:hover {
        color: ${(t) => shiftColor(t['list-group-item-color-scale'], value(t))};
      }

      &:focus {
        color: ${(t) => shiftColor(t['list-group-item-color-scale'], value(t))};
      }
    `,
    [`.list-group-item-${state}-action-active`]: css`
      background-color: ${(t) =>
        shiftColor(t['list-group-item-color-scale'], value(t))};
      border-color: ${(t) =>
        shiftColor(t['list-group-item-color-scale'], value(t))};
    `,
    [`.list-group-item-${state}-action-active-text`]: css`
      color: $white;
    `,
  })),
});

const ListGroupItemAction = React.forwardRef((props, ref) => {
  // Get component specific props before using useAction.
  const { color, first = false, last = false, ...restProps } = props;

  const [actionProps, actionRef] = useAction(restProps, ref);

  const {
    children,
    active = false,
    disabled = false,
    style,
    textStyle,
    ...elementProps
  } = actionProps;

  const { flush } = useForcedContext(ListGroupContext);

  const styles = { ...baseStyles, ...actionStyles };

  const classes = getStyles(styles, [
    '.list-group-item',
    '.list-group-item-action',
    active && '.list-group-item-active',
    first && '.list-group-item-first',
    last && '.list-group-item-last',
    disabled && '.list-group-item-disabled',
    !first && '.list-group-item-not-first',
    !first && active && '.list-group-item-not-first-active',
    flush && '.list-group-item-flush',
    flush && last && '.list-group-item-flush-last',
    color && `.list-group-item-${color}`,
    color && `.list-group-item-${color}-action`,
    color && active && `.list-group-item-${color}-action-active`,
  ]);

  const textClasses = getStyles(styles, [
    '.list-group-item-text',
    '.list-group-item-action-text',
    active && '.list-group-item-active-text',
    disabled && '.list-group-item-disabled-text',
    color && `.list-group-item-${color}-text`,
    color && `.list-group-item-${color}-action-text`,
    color && active && `.list-group-item-${color}-action-active-text`,
  ]);

  return (
    <Pressable
      {...elementProps}
      ref={actionRef}
      {...optional(active, { accessibilityCurrent: true })}
      disabled={disabled}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {children}
    </Pressable>
  );
});

ListGroupItemAction.displayName = 'ListGroupItemAction';
ListGroupItemAction.propTypes = propTypes;

export default ListGroupItemAction;
