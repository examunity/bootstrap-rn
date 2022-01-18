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
  '.popover-body': css`
    padding: $popover-body-padding-y $popover-body-padding-x;
  `,
  '.popover-body-text': css`
    font-size: $popover-font-size;
    color: $popover-body-color;
  `,
});

const PopoverBody = (props) => {
  const { children } = props;

  const classes = getStyles(styles, ['.popover-body']);
  const contentTextClasses = getStyles(styles, ['.popover-body-text']);

  return (
    <View style={[classes]}>
      <TextStyleProvider style={contentTextClasses}>
        {children}
      </TextStyleProvider>
    </View>
  );
};

PopoverBody.propTypes = propTypes;

export default PopoverBody;