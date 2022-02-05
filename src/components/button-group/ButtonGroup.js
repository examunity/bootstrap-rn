import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles, makeListChildren } from '../../utils';
import ButtonGroupContext from './ButtonGroupContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['lg', 'sm']),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.btn-group': css`
    flex-direction: row; // added for bootstrap-native
    border-radius: $btn-border-radius;
  `,
});

const ButtonGroup = React.forwardRef((props, ref) => {
  const { children, size, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.btn-group']);

  // Accessiblity role tabpanel is only supported on web.
  const role = Platform.OS === 'web' ? 'group' : null;

  return (
    <View
      {...elementProps}
      ref={ref}
      accessibilityRole={role}
      style={[classes, style]}
    >
      <ButtonGroupContext.Provider value={{ size }}>
        {makeListChildren(children)}
      </ButtonGroupContext.Provider>
    </View>
  );
});

ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.propTypes = propTypes;

export default ButtonGroup;
