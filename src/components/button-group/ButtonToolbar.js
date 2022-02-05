import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.btn-toolbar': css`
    display: flex;
    flex-direction: row; // added for bootstrap-rn
    flex-wrap: wrap;
    justify-content: flex-start;
  `,
});

const ButtonToolbar = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.btn-toolbar']);

  return (
    <View
      {...elementProps}
      ref={ref}
      accessibilityRole="toolbar"
      style={[classes, style]}
    >
      {children}
    </View>
  );
});

ButtonToolbar.displayName = 'ButtonToolbar';
ButtonToolbar.propTypes = propTypes;

export default ButtonToolbar;
