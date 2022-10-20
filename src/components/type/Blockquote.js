import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  blockquote: css`
    margin-bottom: $blockquote-margin-y;
  `,
  'blockquote --text': css`
    font-size: $blockquote-font-size;
  `,
});

const Blockquote = React.forwardRef((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['blockquote']);

  const textClasses = getStyles(styles, ['blockquote --text']);

  // Accessiblity role blockquote is only supported on web.
  const role = Platform.OS === 'web' ? 'blockquote' : null;

  return (
    <View
      {...elementProps}
      ref={ref}
      accessibilityRole={role}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {children}
    </View>
  );
});

Blockquote.displayName = 'Blockquote';
Blockquote.propTypes = propTypes;

export default Blockquote;
