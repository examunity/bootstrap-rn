import React from 'react';
import { Svg, Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import css from '../../style/css';
import { getStyles } from '../../utils';
import StyleSheet from '../../style/StyleSheet';
import Pressable from '../Pressable';

const propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.close': css`
    // Workaround for missing box-sizing in react native.
    $additionalHeight: $btn-close-padding-y * 2;
    $additionalWidth: $btn-close-padding-x * 2;

    // box-sizing: content-box;
    width: $btn-close-width + $additionalHeight;
    height: $btn-close-height + $additionalWidth;
    padding: $btn-close-padding-y $btn-close-padding-x;
    background: transparent;
    border-width: 0; // for button elements
    // @include border-radius();
    opacity: $btn-close-opacity;

    &:hover {
      opacity: $btn-close-hover-opacity;
    }

    &:focus {
      // outline: 0;
      // box-shadow: $btn-close-focus-shadow;
      opacity: $btn-close-focus-opacity;
    }
  `,
  '.close-text': css`
    color: $btn-close-color;

    // Override <a>'s hover style
    &:hover {
      color: $btn-close-color;
      text-decoration: none;
    }
  `,
  '.close-disabled': css`
    // pointer-events: none;
    // user-select: none;
    opacity: $btn-close-disabled-opacity;
  `,
});

function CloseButton(props) {
  const {
    children,
    disabled = false,
    style,
    textStyle,
    ...elementProps
  } = props;

  const classes = getStyles(styles, ['.close', disabled && '.close-disabled']);
  const textClasses = getStyles(styles, ['.close-text']);

  return (
    <Pressable
      {...elementProps}
      disabled={disabled}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
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
