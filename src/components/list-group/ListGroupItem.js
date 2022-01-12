import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles, each } from '../../utils';
import { THEME_COLORS } from '../../theme/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(Object.keys(THEME_COLORS)),
  style: PropTypes.any,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  '.list-group-item': css`
    position: relative;
    // display: block;
    padding: $list-group-item-padding-y $list-group-item-padding-x;
    color: $list-group-color;
    // text-decoration: if($link-decoration == none, null, none);
    background-color: $list-group-bg;

    border: $list-group-border-width solid $list-group-border-color;
  `,

  ...each(THEME_COLORS, (color, value) => ({
    [`.list-group-item-${color}`]: css`
      background-color: ${value};
      border-color: ${value};
    `,
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
  })),
});

const ListGroupItem = React.forwardRef((props, ref) => {
  const {
    children,
    color = 'null',
    disabled = false,
    active = false,
    style,
    ...elementProps
  } = props;

  const classes = getStyles(styles, [
    `.list-group-item`,
    `.list-group-item-${color}`,
    active && '.active',
    disabled && '.disabled',
  ]);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </View>
  );
});

ListGroupItem.displayName = 'ListGroupItem';
ListGroupItem.propTypes = propTypes;

export default ListGroupItem;
