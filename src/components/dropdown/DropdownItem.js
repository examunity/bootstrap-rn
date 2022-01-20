import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
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
      color: $dropdown-link-hover-color;
      // text-decoration: if($link-hover-decoration == underline, none, null);
      // @include gradient-bg($dropdown-link-hover-bg);
      background-color: $dropdown-link-hover-bg;
    }

    &:focus {
      color: $dropdown-link-hover-color;
      // text-decoration: if($link-hover-decoration == underline, none, null);
      // @include gradient-bg($dropdown-link-hover-bg);
      background-color: $dropdown-link-hover-bg;
    }
  `,
  '.dropdown-item-text': css`
    font-weight: $font-weight-normal;
    color: $dropdown-link-color;
    // text-align: inherit;
    text-decoration: none; // if($link-decoration == none, null, none);
    // white-space: nowrap;
  `,

  '.dropdown-item-active': css`
    color: $dropdown-link-active-color;
    text-decoration: none;
    // @include gradient-bg($dropdown-link-active-bg);
    background-color: $dropdown-link-active-bg;
  `,
  '.dropdown-item-disabled': css`
    color: $dropdown-link-disabled-color;
    // pointer-events: none;
    background-color: transparent;
    // Remove CSS gradients if they're enabled
    // background-image: if($enable-gradients, none, null);

    &:hover {
      color: $dropdown-link-disabled-color;
      background-color: transparent;
    }

    &:focus {
      color: $dropdown-link-disabled-color;
      background-color: transparent;
    }
  `,
});

const DropdownItem = (props) => {
  const {
    children,
    onPress: handlePress = () => {},
    active = false,
    disabled = false,
    style,
    textStyle,
    ...elementProps
  } = props;

  const dropdown = useContext(DropdownContext);

  const classes = getStyles(styles, [
    '.dropdown-item',
    active && '.dropdown-item-active',
    disabled && '.dropdown-item-disabled',
  ]);

  const textClasses = getStyles(styles, [
    '.dropdown-item-text',
    disabled && '.dropdown-item-disabled',
  ]);

  return (
    <Pressable
      {...elementProps}
      onPress={(event) => {
        dropdown.setVisible(false);
        handlePress(event);
      }}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {children}
    </Pressable>
  );
};

DropdownItem.propTypes = propTypes;

export default DropdownItem;
