import React from 'react';
import PropTypes from 'prop-types';
import View from '../View';
import Heading from '../Heading';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.popover-header': css`
    padding: $popover-header-padding-y $popover-header-padding-x;
    background-color: $popover-header-bg;
    border-bottom-width: $popover-border-width;
    border-style: solid;
    border-color: $popover-border-color;
    border-top-left-radius: $popover-border-radius;
    border-top-right-radius: $popover-border-radius;
  `,
  '.popover-header-text': css`
    margin-bottom: 0; // Reset the default from Reboot
    font-size: $font-size-base;
    line-height: $font-size-base * $headings-line-height; // added for bootstrap-rn
    color: $popover-header-color;
  `,
});

const PopoverHeader = React.forwardRef((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.popover-header']);
  const textClasses = getStyles(styles, ['.popover-header-text']);

  // composite component
  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      <Heading size={3} style={[textClasses, textStyle]}>
        {children}
      </Heading>
    </View>
  );
});

PopoverHeader.displayName = 'PopoverHeader';
PopoverHeader.propTypes = propTypes;

export default PopoverHeader;
