import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Text from '../Text';
import View from '../View';
import { THEME_COLORS } from '../../theme/proxies';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(Object.keys(THEME_COLORS)),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
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

const getStyleName = (styleName, color) => {
  if (!color) {
    return styleName;
  }

  return styleName ? `bg-${color} ${styleName}` : `bg-${color}`;
};

const Badge = React.forwardRef((props, ref) => {
  const {
    children,
    color, // will be deprecated soon
    style,
    textStyle,
    styleName,
    ...elementProps
  } = props;

  const classes = getStyles(styles, ['.badge']);

  const textClasses = getStyles(styles, ['.badge-text']);

  return (
    <View
      {...elementProps}
      ref={ref}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
      styleName={getStyleName(styleName, color)}
    >
      <Text>{children}</Text>
    </View>
  );
});

Badge.displayName = 'Badge';
Badge.propTypes = propTypes;

export default Badge;
