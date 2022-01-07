import React from 'react';
import { Svg, Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import css from '../../style/css';
import { getStyles } from '../../utils';
import StyleSheet from '../../style/StyleSheet';
import Pressable from '../Pressable';

const propTypes = {
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  '.close': css`
    // box-sizing: content-box;
    padding-vertical: $btn-close-padding-x;
    padding-horizontal: $btn-close-padding-y;
    width: $btn-close-width;
    height: $btn-close-height;
    color: $btn-close-color;
    background: transparent;
    border-width: 0; // for button elements
    opacity: $btn-close-opacity;
  `,
});

function CloseButton(props) {
  const classes = getStyles(styles, ['.close']);

  return (
    <Pressable {...props} style={[classes]}>
      <Svg viewBox="0 0 16 16">
        <Path
          fill={StyleSheet.value('btn-close-color')}
          d="M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z"
        />
      </Svg>
    </Pressable>
  );
}

CloseButton.propTypes = propTypes;

export default CloseButton;
