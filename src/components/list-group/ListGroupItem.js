import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import TextStyleProvider from '../../style/TextStyleProvider';
import View from '../View';
import { getStyles, each } from '../../utils';
import { THEME_COLORS } from '../../theme/constants';
import { shiftColor } from '../../theme/functions';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(Object.keys(THEME_COLORS)),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

export const styles = StyleSheet.create({
  '.list-group-item': css`
    position: relative;
    // display: block;
    padding: $list-group-item-padding-y $list-group-item-padding-x;
    // text-decoration: if($link-decoration == none, null, none);
    background-color: $list-group-bg;
    border: $list-group-border-width solid $list-group-border-color;
  `,
  '.list-group-item-text': css`
    color: $list-group-color;
  `,
  '.list-group-item-disabled': css`
    // pointer-events: none;
    background-color: $list-group-disabled-bg;
  `,
  '.list-group-item-disabled-text': css`
    color: $list-group-disabled-color;
  `,
  '.list-group-item-active': css`
    z-index: 2; // Place active items above their siblings for proper border styling
    background-color: $list-group-active-bg;
    border-color: $list-group-active-border-color;
  `,
  '.list-group-item-active-text': css`
    color: $list-group-active-color;
  `,
  ...each(THEME_COLORS, (state, value) => ({
    [`.list-group-item-${state}`]: css`
      background-color: ${(t) =>
        shiftColor(t['list-group-item-bg-scale'], value(t))};
    `,
    [`.list-group-item-${state}-text`]: css`
      color: ${(t) => shiftColor(t['list-group-item-color-scale'], value(t))};
    `,
  })),
});

const ListGroupItem = React.forwardRef((props, ref) => {
  const {
    children,
    color,
    active = false,
    disabled = false,
    style,
    ...elementProps
  } = props;

  const classes = getStyles(styles, [
    '.list-group-item',
    color && `.list-group-item-${color}`,
    active && '.list-group-item-active',
    disabled && '.list-group-item-disabled',
  ]);

  const textClasses = getStyles(styles, [
    '.list-group-item-text',
    color && `.list-group-item-${color}-text`,
    active && '.list-group-item-active-text',
    disabled && '.list-group-item-disabled-text',
  ]);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      <TextStyleProvider style={textClasses}>{children}</TextStyleProvider>
    </View>
  );
});

ListGroupItem.displayName = 'ListGroupItem';
ListGroupItem.propTypes = propTypes;

export default ListGroupItem;
