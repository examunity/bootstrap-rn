import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import { getStyles, concatFns } from '../../utils';
import useForcedContext from '../../hooks/useForcedContext';
import css from '../../style/css';
import Pressable from '../Pressable';
import DropdownContext from './DropdownContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.dropdown-item': css`
    width: 100%;
    padding: $dropdown-item-padding-y $dropdown-item-padding-x;
    // clear: both;
    background-color: transparent;
    border: 0;

    &:hover {
      // @include gradient-bg($dropdown-link-hover-bg);
      background-color: $dropdown-link-hover-bg;
    }
    &:focus {
      // @include gradient-bg($dropdown-link-hover-bg);
      background-color: $dropdown-link-hover-bg;
    }
  `,
  '.dropdown-item --text': css`
    font-weight: $font-weight-normal;
    color: $dropdown-link-color;
    // text-align: inherit;
    text-decoration: none; // if($link-decoration == none, null, none);
    // white-space: nowrap;

    &:hover {
      color: $dropdown-link-hover-color;
      text-decoration: none; // if($link-hover-decoration == underline, none, null);
    }
    &:focus {
      color: $dropdown-link-hover-color;
      text-decoration: none; // if($link-hover-decoration == underline, none, null);
    }
  `,
  '.dropdown-item.active': css`
    // @include gradient-bg($dropdown-link-active-bg);
    background-color: $dropdown-link-active-bg;

    &:hover {
      background-color: $dropdown-link-active-bg;
    }
    &:focus {
      background-color: $dropdown-link-active-bg;
    }
  `,
  '.dropdown-item.active --text': css`
    color: $dropdown-link-active-color;
    text-decoration: none;

    &:hover {
      color: $dropdown-link-active-color;
    }
    &:focus {
      color: $dropdown-link-active-color;
    }
  `,

  '.dropdown-item.disabled': css`
    // pointer-events: none;
    background-color: transparent;
    // Remove CSS gradients if they're enabled
    // background-image: if($enable-gradients, none, null);

    &:hover {
      background-color: transparent;
    }
    &:focus {
      background-color: transparent;
    }
  `,
  '.dropdown-item.disabled --text': css`
    color: $dropdown-link-disabled-color;

    &:hover {
      color: $dropdown-link-disabled-color;
    }
    &:focus {
      color: $dropdown-link-disabled-color;
    }
  `,
});

const DropdownItem = (props) => {
  const {
    children,
    onPress: handlePress,
    active = false,
    disabled = false,
    style,
    textStyle,
    ...elementProps
  } = props;

  const dropdown = useForcedContext(DropdownContext);

  const classes = getStyles(styles, [
    '.dropdown-item',
    active && '.dropdown-item.active',
    disabled && '.dropdown-item.disabled',
  ]);

  const textClasses = getStyles(styles, [
    '.dropdown-item --text',
    active && '.dropdown-item.active --text',
    disabled && '.dropdown-item.disabled --text',
  ]);

  return (
    <Pressable
      {...elementProps}
      onPress={concatFns(() => {
        dropdown.setVisible(false);
      }, handlePress)}
      disabled={disabled}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {children}
    </Pressable>
  );
};

DropdownItem.displayName = 'DropdownItem';
DropdownItem.propTypes = propTypes;

export default DropdownItem;
