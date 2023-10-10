import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Text from '../Text';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  code: css`
    font-family: $font-family-code;
    font-size: $code-font-size;
    color: $code-color;
    @include platform(web) {
      word-wrap: break-word;
    }
  `,
});

const Code = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['code']);

  // Accessiblity role code is only supported on web.
  const role = Platform.OS === 'web' ? 'code' : null;

  return (
    <Text {...elementProps} ref={ref} role={role} style={[classes, style]}>
      {children}
    </Text>
  );
});

Code.displayName = 'Code';
Code.propTypes = propTypes;

export default Code;
