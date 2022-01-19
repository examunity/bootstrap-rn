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
  `,
  '.dropdown-item-text': css`
    font-weight: $font-weight-normal;
    color: $dropdown-link-color;
    // text-align: inherit;
    text-decoration: none; // if($link-decoration == none, null, none);
    // white-space: nowrap;
  `,
});

const DropdownItem = (props) => {
  const {
    children,
    onPress: handlePress = () => {},
    style,
    textStyle,
    ...elementProps
  } = props;

  const dropdown = useContext(DropdownContext);

  const classes = getStyles(styles, ['.dropdown-item']);

  const textClasses = getStyles(styles, ['.dropdown-item-text']);

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
