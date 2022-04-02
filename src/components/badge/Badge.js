import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Text from '../Text';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
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

const Badge = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;
  const classes = getStyles(styles, ['.badge', '.badge-text']);

  return (
    <Text {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </Text>
  );
});

Badge.displayName = 'Badge';
Badge.propTypes = propTypes;

export default Badge;
