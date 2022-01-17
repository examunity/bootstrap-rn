import React from 'react';
import PropTypes from 'prop-types';
import View from '../View';
import Text from '../Text';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  '.popover-header': css`
    padding-vertical: $popover-header-padding-x;
    padding-horizontal: $popover-header-padding-y;
    margin-bottom: 0; // Reset the default from Reboot
    font-size: $font-size-base;
    color: $popover-header-color;
    background-color: $popover-header-bg;
    border-bottom-width: $popover-border-width;
    border-style: solid;
    border-color: $popover-border-color;
  `,
});

const PopoverHeader = (props) => {
  const { children } = props;

  const classes = getStyles(styles, ['.popover-header']);

  return (
    <View style={[classes]}>
      <Text>{children}</Text>
    </View>
  );
};

PopoverHeader.propTypes = propTypes;

export default PopoverHeader;
