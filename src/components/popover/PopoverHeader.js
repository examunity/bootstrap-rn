import React from 'react';
import PropTypes from 'prop-types';
import Heading from '../type/Heading';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.popover-header': css`
    padding: $popover-header-padding-y $popover-header-padding-x;
    margin-bottom: 0; // Reset the default from Reboot
    font-size: $font-size-base;
    color: $popover-header-color;
    background-color: $popover-header-bg;
    border-bottom-width: $popover-border-width;
    border-style: solid;
    border-color: $popover-border-color;
    border-top-start-radius: $popover-border-radius;
    border-top-end-radius: $popover-border-radius;
  `,
});

const PopoverHeader = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.popover-header']);

  return (
    <Heading {...elementProps} ref={ref} size={3} style={[classes, style]}>
      {children}
    </Heading>
  );
});

PopoverHeader.displayName = 'PopoverHeader';
PopoverHeader.propTypes = propTypes;

export default PopoverHeader;
