import React from 'react';
import { Platform } from 'react-native';
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
  first: PropTypes.bool,
  last: PropTypes.bool,
  disabled: PropTypes.bool,
  flush: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

export const styles = StyleSheet.create({
  '.list-group-item': css`
    position: relative;
    // display: block;
    padding: $list-group-item-padding-y $list-group-item-padding-x;
    background-color: $list-group-bg;
    border: $list-group-border-width solid $list-group-border-color;
  `,
  '.list-group-item-text': css`
    color: $list-group-color;
    text-decoration: none; // if($link-decoration == none, null, none);
  `,
  '.list-group-item-first': css`
    border-top-start-radius: $list-group-border-radius;
    border-top-end-radius: $list-group-border-radius;
  `,
  '.list-group-item-last': css`
    border-bottom-start-radius: $list-group-border-radius;
    border-bottom-end-radius: $list-group-border-radius;
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
  '.list-group-item-not-first': css`
    border-top-width: 0;
  `,
  '.list-group-item-not-first-active': css`
    margin-top: -$list-group-border-width;
    border-top-width: $list-group-border-width;
  `,
  '.list-group-item-flush': css`
    border-top-start-radius: 0; // added for bootstyle
    border-top-end-radius: 0; // added for bootstyle
    border-bottom-start-radius: 0; // added for bootstyle
    border-bottom-end-radius: 0; // added for bootstyle
    border-top-width: 0;
    border-right-width: 0;
    border-bottom-width: $list-group-border-width;
    border-left-width: 0;
  `,
  '.list-group-item-flush-last': css`
    border-bottom-width: 0;
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
    first = false,
    last = false,
    disabled = false,
    flush = false,
    style,
    ...elementProps
  } = props;

  const classes = getStyles(styles, [
    '.list-group-item',
    first && '.list-group-item-first',
    last && '.list-group-item-last',
    active && '.list-group-item-active',
    disabled && '.list-group-item-disabled',
    !first && '.list-group-item-not-first',
    !first && active && '.list-group-item-not-first-active',
    flush && '.list-group-item-flush',
    flush && last && '.list-group-item-flush-last',
    color && `.list-group-item-${color}`,
  ]);

  const textClasses = getStyles(styles, [
    '.list-group-item-text',
    active && '.list-group-item-active-text',
    disabled && '.list-group-item-disabled-text',
    color && `.list-group-item-${color}-text`,
  ]);

  // Accessiblity role listitem is only supported on web.
  const role = Platform.OS === 'web' ? 'listitem' : null;

  return (
    <View
      {...elementProps}
      ref={ref}
      accessibilityRole={role}
      style={[classes, style]}
    >
      <TextStyleProvider style={textClasses}>{children}</TextStyleProvider>
    </View>
  );
});

ListGroupItem.displayName = 'ListGroupItem';
ListGroupItem.propTypes = propTypes;

export default ListGroupItem;
