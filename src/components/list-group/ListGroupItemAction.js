import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles, each } from '../../utils';
import Pressable from '../Pressable';
import { THEME_COLORS } from '../../theme/constants';
import { shadeColor, colorContrast } from '../../theme/functions';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(Object.keys(THEME_COLORS)),
  style: PropTypes.any,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  '.list-group-action': css`
    position: relative;
    padding: $list-group-item-padding-y $list-group-item-padding-x;
    color: $list-group-color;
    background-color: $list-group-bg;

    border: $list-group-border-width solid $list-group-border-color;
  `,
  ...each(THEME_COLORS, (color, value) => ({
    [`.list-group-item-${color}`]: css`
      background-color: ${value};
      border-color: ${value};

      &:focus {
        background-color: ${(t) =>
          shadeColor(t['list-hover-bg-shade-amount'], value(t))};
        border-color: ${(t) =>
          shadeColor(t['list-hover-border-shade-amount'], value(t))};
      }

      &:hover {
        background-color: ${(t) =>
          shadeColor(t['list-hover-bg-shade-amount'], value(t))};
        border-color: ${(t) =>
          shadeColor(t['list-hover-border-shade-amount'], value(t))};
      }

      &:active {
        color: $list-group-action-active-color;
        background-color: $list-group-action-active-bg;
      }
    `,
  })),
  '.active': css`
    z-index: 2; // Place active items above their siblings for proper border styling
    color: $list-group-active-color;
    background-color: $list-group-active-bg;
    border-color: $list-group-active-border-color;
  `,
  '.disabled': css`
    color: $list-group-disabled-color;
    background-color: $list-group-disabled-bg;
  `,
});

const ListGroupItemAction = React.forwardRef((props, ref) => {
  const {
    children,
    color = 'null',
    disabled = false,
    active = false,
    style,
    ...elementProps
  } = props;
  const classes = getStyles(styles, [
    `.list-group-action`,
    `.list-group-item-${color}`,
    active && '.active',
    disabled && '.disabled',
  ]);

  return (
    <Pressable {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </Pressable>
  );
});

ListGroupItemAction.displayName = 'ListGroupItemAction';
ListGroupItemAction.propTypes = propTypes;

export default ListGroupItemAction;
