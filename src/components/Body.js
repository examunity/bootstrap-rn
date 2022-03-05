import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import View from './View';
import TextStyleProvider from '../style/TextStyleProvider';
import { getStyles } from '../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  body: css`
    background-color: $body-bg;
  `,
  'body-text': css`
    color: $body-color;
    text-align: $body-text-align;
  `,
});

const Body = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['body']);
  const textClasses = getStyles(styles, ['body-text']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      <TextStyleProvider style={textClasses}>{children}</TextStyleProvider>
    </View>
  );
});

Body.displayName = 'Body';
Body.propTypes = propTypes;

export default Body;
