// Bootstrap Button
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Pressable, StyleSheet, Text } from 'react-native';
import COLORS from './colors';

const styles = StyleSheet.create({
  // Container Styles
  containerDefault: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  btn_Primary: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },

  btn_Secondary: {
    backgroundColor: COLORS.SECONDARY,
    borderColor: COLORS.SECONDARY,
  },
  containerSuccess: {
    backgroundColor: COLORS.SUCCESS,
    borderColor: COLORS.SUCCESS,
  },
  containerDanger: {
    backgroundColor: COLORS.DANGER,
    borderColor: COLORS.DANGER,
  },
  containerWarning: {
    backgroundColor: COLORS.WARNING,
    borderColor: COLORS.WARNING,
  },
  containerInfo: {
    backgroundColor: COLORS.INFO,
    borderColor: COLORS.INFO,
  },
  containerLight: {
    backgroundColor: COLORS.LIGHT,
    borderColor: COLORS.LIGHT,
  },
  containerDark: {
    backgroundColor: COLORS.DARK,
    borderColor: COLORS.DARK,
  },

  containerPrimaryOutline: {
    backgroundColor: 'transparent',
  },
  containerSecondaryOutline: {
    backgroundColor: 'transparent',
  },
  containerLarge: {
    paddingVertical: 15,
  },
  containerSmall: {
    paddingVertical: 5,
  },
  containerDisabled: {
    opacity: 0.65,
  },

  // TextStyles
  textDefault: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  textPrimary: {},
  textPrimaryOutline: {
    color: COLORS.PRIMARY,
  },
  textSecondary: {},
  textSecondaryOutline: {
    color: COLORS.SECONDARY,
  },
  textLarge: {
    fontSize: 20,
  },
  textSmall: {
    fontSize: 14,
  },
  textDisabled: {},
});

const getStyles = ({ size, color, outline, disabled }) => {
  const containerStyles = [styles.containerDefault];
  const textStyles = [styles.textDefault];

  if (size === 'large') {
    containerStyles.push(styles.containerLarge);
    textStyles.push(styles.textLarge);
  } else if (size === 'small') {
    containerStyles.push(styles.containerSmall);
    textStyles.push(styles.textSmall);
  }

  // color = Button Color
  switch (color) {
    case COLORS.PRIMARY:
    case 'primary':
      containerStyles.push(styles.btn_Primary);
      textStyles.push(styles.textPrimary);
      break;
    case COLORS.SECONDARY:
    case 'secondary':
      containerStyles.push(styles.btn_Secondary);
      textStyles.push(styles.textPrimary);
      break;
    case COLORS.SUCCESS:
    case 'success':
      containerStyles.push(styles.containerSuccess);
      textStyles.push(styles.textPrimary);
      break;
    case COLORS.DANGER:
    case 'danger':
      containerStyles.push(styles.containerDanger);
      textStyles.push(styles.textPrimary);
      break;
    case COLORS.WARNING:
    case 'warning':
      containerStyles.push(styles.containerWarning);
      textStyles.push(styles.textPrimary);
      break;
    case COLORS.INFO:
    case 'info':
      containerStyles.push(styles.containerInfo);
      textStyles.push(styles.textPrimary);
      break;
    case COLORS.LIGHT:
    case 'light':
      containerStyles.push(styles.containerLight);
      textStyles.push(styles.textPrimary);
      break;
    case COLORS.DARK:
    case 'dark':
      containerStyles.push(styles.containerDark);
      textStyles.push(styles.textPrimary);
      break;

    default:
      containerStyles.push(styles.btn_Primary);
      textStyles.push(styles.textPrimary);
  }

  if (outline) {
    containerStyles.push(styles.containerSecondaryOutline);
    textStyles.push(styles.textSecondaryOutline);
  }

  if (disabled) {
    containerStyles.push(styles.containerDisabled);
    textStyles.push(styles.textDisabled);
  }

  return { textStyles, containerStyles };
};

const propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  color: PropTypes.oneOf(COLORS),
  outline: PropTypes.bool,
  disabled: PropTypes.bool,
};

const defaultProps = {
  size: 'default',
  color: 'primary',
  outline: false,
  disabled: false,
};

function Button(props) {
  const { text, onPress, disabled, ...rest } = props;
  const { textStyles, containerStyles } = getStyles({ disabled, ...rest });

  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={containerStyles}
    >
      <Text style={textStyles}>{props.text}</Text>
    </TouchableOpacity>
  );
}

export default Button;
