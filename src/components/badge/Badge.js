import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import Text from '../Text';
import v from '../../theme/variables';
import getStyles from '../../utils/getStyles';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: v.badgePaddingY,
    paddingHorizontal: v.badgePaddingX,
    borderRadius: v.badgeBorderRadius,
  },
  badgeText: {
    fontSize: v.badgeFontSize,
    lineHeight: 1,
    color: v.badgeColor,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
  },
});

function Badge(props) {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['badge']);

  const textClasses = getStyles(styles, ['badgeText']);

  return (
    <Text style={[classes, textClasses, style]} {...elementProps}>
      {children}
    </Text>
  );
}

Badge.propTypes = propTypes;

export default Badge;
