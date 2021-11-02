import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import v from '../utils/variables';
import getStyles from '../utils/getStyles';
import ucfirst from '../utils/ucfirst';
import each from '../utils/each';
import { shiftColor } from '../utils/functions';

// Testgebiet von Anton
const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(Object.keys(v.themeColors)),
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: v.badgePaddingY,
    paddingHorizontal: v.badgePaddingX,
    fontSize: v.badgeFontSize,
    borderWidth: 1,
    borderRadius: v.badgeBorderRadius,
    color: '#fff',
    borderColor: 'transparent',
  },
  ...each(v.themeColors, (state, value) => ({
    [`badge${ucfirst(state)}`]: {
      backgroundColor: value,
    },
  })),
});

function Badge(props) {
  const { color = 'primary', children, ...elementProps } = props;

  const classes = getStyles(styles, ['badge', `badge${ucfirst(color)}`]);

  return (
    <View style={classes} {...elementProps}>
      <Text>{children}</Text>
    </View>
  );
}

Badge.propTypes = propTypes;

export default Badge;
