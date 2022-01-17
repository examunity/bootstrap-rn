import React from 'react';
import PropTypes from 'prop-types';
import View from '../View';
import TextStyleProvider from '../../style/TextStyleProvider';
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
    background-color: $popover-header-bg;
    border-bottom-width: $popover-border-width;
    border-style: solid;
    border-color: $popover-border-color;
    border-radius: $popover-border-radius $popover-border-radius 0 0;
  `,
  '.popover-header-text': css`
    font-size: $popover-font-size;
    color: $popover-header-color;
  `,
});

const PopoverHeader = (props) => {
  const { children } = props;

  const classes = getStyles(styles, ['.popover-header']);
  const contentTextClasses = getStyles(styles, ['.popover-body-text']);

  return (
    <View style={[classes]}>
      <TextStyleProvider style={contentTextClasses}>
        {children}
      </TextStyleProvider>
    </View>
  );
};

PopoverHeader.propTypes = propTypes;

export default PopoverHeader;
