// Bootstrap Button
import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import Pressable from '../Pressable';
import Text from '../Text';
import each from '../../utils/each';
import getStyles from '../../utils/getStyles';
import ucfirst from '../../utils/ucfirst';
import v from '../../theme/variables';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(Object.keys(v.themeColors)),
  dismissible: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    paddingVertical: v.btnPaddingY,
    paddingHorizontal: v.btnPaddingX,
    borderWidth: v.btnBorderWidth,
    borderColor: 'transparent',
    borderRadius: v.btnBorderRadius,
  },
  ...each(v.themeColors, (state, value) => ({
    [`button${ucfirst(state)}`]: {
      backgroundColor: value,
      borderColor: value,
    },
  })),
  buttonDismissible: {
    // TODO
  },
});

function Button(props) {
  const {
    color = 'primary',
    dismissible = false,
    children,
    ...elementProps
  } = props;

  const classes = getStyles(styles, [
    'button',
    `button${ucfirst(color)}`,
    dismissible && 'buttonDismissible',
  ]);

  return (
    <Pressable style={classes} {...elementProps}>
      <Text>{children}</Text>
    </Pressable>
  );
}

Button.propTypes = propTypes;
export default Button;
