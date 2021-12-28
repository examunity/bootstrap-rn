import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import TextStyleProvider from '../../style/TextStyleProvider';
import css from '../../style/css';
import Text from '../Text';
import View from '../View';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.badge': css`
    // display: inline-block;
    padding: $badge-padding-y $badge-padding-x;
    border-radius: $badge-border-radius;
    // @include gradient-bg();
  `,
  '.badge-text': css`
    font-size: $badge-font-size;
    font-weight: $badge-font-weight;
    line-height: $badge-font-size * 1;
    color: $badge-color;
    text-align: center;
    // white-space: nowrap;
    // vertical-align: baseline;
  `,
});

function Badge(props) {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.badge']);

  const textClasses = getStyles(styles, ['.badge-text']);

  return (
    <View {...elementProps} style={[classes, style]}>
      <TextStyleProvider style={textClasses}>
        <Text>{children}</Text>
      </TextStyleProvider>
    </View>
  );
}

Badge.propTypes = propTypes;

export default Badge;
