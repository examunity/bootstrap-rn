import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import TextStyleProvider from '../../style/TextStyleProvider';
import css from '../../style/css';
import Text from '../Text';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.progress-bar': css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    background-color: $progress-bar-bg;
    // @include transition($progress-bar-transition);
  `,
  '.progress-bar-text': css`
    color: white;
    text-align: center;
    // white-space: nowrap;
  `,
});

function ProgressBar(props) {
  const { children, value, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.progress-bar']);

  const textClasses = getStyles(styles, ['.progress-bar-text']);

  return (
    <TextStyleProvider value={textClasses}>
      <Text {...elementProps} style={[classes, style, { width: `${value}%` }]}>
        {children}
      </Text>
    </TextStyleProvider>
  );
}

ProgressBar.propTypes = propTypes;

export default ProgressBar;
