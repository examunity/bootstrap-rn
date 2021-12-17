import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';
import TextStyleContext from '../../style/TextStyleContext';
import each from '../../utils/each';
import getStyles from '../../utils/getStyles';
import ucfirst from '../../utils/ucfirst';
import v from '../../theme/variables';
import { shiftColor } from '../../utils/functions';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(Object.keys(v.themeColors)),
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
  ...each(v.themeColors, (state, value) => ({
    [`alert${ucfirst(state)}`]: {
      backgroundColor: shiftColor(v.alertBgScale, value),
      borderColor: shiftColor(v.alertBorderScale, value),
    },
    [`alert${ucfirst(state)}Text`]: {
      color: shiftColor(v.alertColorScale, value),
    },
  })),
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
    <View style={[classes, elementProps.style]} {...elementProps}>
      <TextStyleContext.Provider value={textClasses}>
        {children}
      </TextStyleContext.Provider>
    </View>
  );
}

Alert.propTypes = propTypes;

export default Alert;
