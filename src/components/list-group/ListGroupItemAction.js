import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Pressable from '../Pressable';
import { getStyles, each } from '../../utils';
import { THEME_COLORS } from '../../theme/proxies';
import { shiftColor, shadeColor } from '../../theme/functions';
import useModifier from '../../hooks/useModifier';
import useForcedContext from '../../hooks/useForcedContext';
import { styles as baseStyles } from './ListGroupItem';
import ListGroupContext from './ListGroupContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(Object.keys(THEME_COLORS)),
  first: PropTypes.bool,
  last: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  activeStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  activeTextStyle: PropTypes.any,
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
        background-color: ${shadeColor(
          0.1,
          shiftColor((t) => t['list-group-item-bg-scale'], value),
        )};
      }

      &:focus {
        background-color: ${shadeColor(
          0.1,
          shiftColor((t) => t['list-group-item-bg-scale'], value),
        )};
      }
    `,
    [`.list-group-item-${state}-action-text`]: css`
      &:hover {
        color: ${shiftColor((t) => t['list-group-item-color-scale'], value)};
      }

      &:focus {
        color: ${shiftColor((t) => t['list-group-item-color-scale'], value)};
      }
    `,
    [`.list-group-item-${state}-action-active`]: css`
      background-color: ${shiftColor(
        (t) => t['list-group-item-color-scale'],
        value,
      )};
      border-color: ${shiftColor(
        (t) => t['list-group-item-color-scale'],
        value,
      )};
    `,
    [`.list-group-item-${state}-action-active-text`]: css`
      color: $white;
    `,
  })),
});

const ListGroupItemAction = React.forwardRef((props, ref) => {
  const [modifierProps, modifierRef] = useModifier('useTabbable', props, ref);

  const {
    children,
    color,
    first = false,
    last = false,
    active = false,
    disabled = false,
    style,
    activeStyle,
    textStyle,
    activeTextStyle,
    ...elementProps
  } = modifierProps;

  const { flush } = useForcedContext(ListGroupContext);

  const styles = { ...baseStyles, ...actionStyles };

  const classes = getStyles(styles, [
    '.list-group-item',
    '.list-group-item-action',
    first && '.list-group-item-first',
    last && '.list-group-item-last',
    disabled && '.list-group-item-disabled',
    !first && '.list-group-item-not-first',
    !first && active && '.list-group-item-not-first-active',
    flush && '.list-group-item-flush',
    flush && last && '.list-group-item-flush-last',
    color && `.list-group-item-${color}`,
    color && `.list-group-item-${color}-action`,
  ]);

  const activeClasses = getStyles(styles, [
    '.list-group-item-active',
    color && `.list-group-item-${color}-action-active`,
  ]);

  const textClasses = getStyles(styles, [
    '.list-group-item-text',
    '.list-group-item-action-text',
    disabled && '.list-group-item-disabled-text',
    color && `.list-group-item-${color}-text`,
    color && `.list-group-item-${color}-action-text`,
  ]);

  const activeTextClasses = getStyles(styles, [
    '.list-group-item-active-text',
    color && `.list-group-item-${color}-action-active-text`,
  ]);

  return (
    <Pressable
      {...elementProps}
      ref={modifierRef}
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
ListGroupItemAction.propTypes = propTypes;

export default ListGroupItemAction;
