import React from 'react';
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
  '.btn-close': css`
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
  '.btn-close-text': css`
    color: $btn-close-color;

    // Override <a>'s hover style
    &:hover {
      color: $btn-close-color;
      text-decoration: none;
    }
  `,
  '.btn-close-disabled': css`
    // pointer-events: none;
    // user-select: none;
    opacity: $btn-close-disabled-opacity;
  `,
});

const CloseButton = React.forwardRef((props, ref) => {
  const {
    children,
    disabled = false,
    style,
    textStyle,
    ...elementProps
  } = props;

  const classes = getStyles(styles, [
    '.btn-close',
    disabled && '.btn-close-disabled',
  ]);
  const textClasses = getStyles(styles, ['.btn-close-text']);

  return (
    <Pressable
      {...elementProps}
      ref={ref}
      disabled={disabled}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {StyleSheet.value('btn-close-bg')}
    </Pressable>
  );
});

CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = propTypes;

export default CloseButton;
