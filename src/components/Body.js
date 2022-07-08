import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import View from './View';
import { getStyles } from '../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  body: css`
    background-color: $body-bg;
    height: 100%; // added for bootstrap-rn
  `,
  'body-text': css`
    color: $body-color;
    text-align: $body-text-align;
  `,
});

const Body = React.forwardRef((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['body']);
  const textClasses = getStyles(styles, ['body-text']);

  return (
    <View
      {...elementProps}
      ref={ref}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {children}
    </View>
  );
});

Body.displayName = 'Body';
Body.propTypes = propTypes;

export default Body;
