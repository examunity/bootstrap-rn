import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import TextStyleProvider from '../../style/TextStyleProvider';
import View from '../View';
import { getStyles, each } from '../../utils';
import { THEME_COLORS } from '../../theme/proxies';
import { shiftColor } from '../../theme/functions';
import useForcedContext from '../../hooks/useForcedContext';
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
    border-top-left-radius: $list-group-border-radius;
    border-top-right-radius: $list-group-border-radius;
  `,
  '.list-group-item-last': css`
    border-bottom-left-radius: $list-group-border-radius;
    border-bottom-right-radius: $list-group-border-radius;
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
    border-top-left-radius: 0; // added for bootstrap-rn
    border-top-right-radius: 0; // added for bootstrap-rn
    border-bottom-left-radius: 0; // added for bootstrap-rn
    border-bottom-right-radius: 0; // added for bootstrap-rn
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
      background-color: ${shiftColor(
        (t) => t['list-group-item-bg-scale'],
        value,
      )};
    `,
    [`.list-group-item-${state}-text`]: css`
      color: ${shiftColor((t) => t['list-group-item-color-scale'], value)};
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
    style,
    ...elementProps
  } = props;

  const { flush } = useForcedContext(ListGroupContext);

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

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      <TextStyleProvider style={textClasses}>{children}</TextStyleProvider>
    </View>
  );
});

ListGroupItem.displayName = 'ListGroupItem';
ListGroupItem.propTypes = propTypes;

export default ListGroupItem;
