import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import TextStyleContext from '../style/TextStyleContext';
import { COLORS } from '../utils/constants';
import getStyles from '../utils/getStyles';
import ucfirst from '../utils/ucfirst';
import v from '../utils/variables';
import { shiftColor } from '../utils/functions';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(COLORS),
  dismissible: PropTypes.bool,
};

const styles = StyleSheet.create({
  alert: {
    position: 'relative',
    paddingVertical: v.alertPaddingY,
    paddingHorizontal: v.alertPaddingX,
    marginBottom: v.alertMarginBottom,
    borderWidth: v.alertBorderWidth,
    borderColor: 'transparent',
    borderRadius: v.alertBorderRadius,
  },
  // TODO: Add all bootstrap colors (danger, warning, etc.)
  // TODO: Create mixin for all colors in javascript
  alertPrimary: {
    backgroundColor: shiftColor(v.alertBgScale, v.primary),
    borderColor: shiftColor(v.alertBorderScale, v.primary),
  },
  alertSecondary: {
    backgroundColor: shiftColor(v.alertBgScale, v.secondary),
    borderColor: shiftColor(v.alertBorderScale, v.secondary),
  },
  alertPrimaryText: {
    color: shiftColor(v.alertColorScale, v.primary),
  },
  alertSecondaryText: {
    color: shiftColor(v.alertColorScale, v.secondary),
  },
  alertDismissible: {
    // TODO
  },
});

function Alert(props) {
  const {
    color = 'primary',
    dismissible = false,
    children,
    ...elementProps
  } = props;

  const classes = getStyles(styles, [
    'alert',
    `alert${ucfirst(color)}`,
    dismissible && 'alertDismissible',
  ]);

  const textClasses = getStyles(styles, [`alert${ucfirst(color)}Text`]);

  return (
    <View style={classes} {...elementProps}>
      <TextStyleContext.Provider value={textClasses}>
        {children}
      </TextStyleContext.Provider>
    </View>
  );
}

Alert.propTypes = propTypes;

export default Alert;
