import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import css from '../../style/css';
import { getStyles } from '../../utils';
import StyleSheet from '../../style/StyleSheet';
import Pressable from '../Pressable';
import ModalContext from '../modal/ModalContext';
import OffcanvasContext from '../offcanvas/OffcanvasContext';

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
    $additional-width: $btn-close-padding-x * 2;
    $additional-height: $btn-close-padding-y * 2;

    // box-sizing: content-box;
    width: $btn-close-width + $additional-width;
    height: $btn-close-height + $additional-height;
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
  // Modal styles
  '.modal-header .btn-close': css`
    padding: $modal-header-padding-y * 0.5 $modal-header-padding-x * 0.5;
    margin: -0.5 * $modal-header-padding-y -0.5 * $modal-header-padding-x -0.5 *
      $modal-header-padding-y auto;

    // Workaround for missing box-sizing in react native.
    width: $btn-close-width + $modal-header-padding-x;
    height: $btn-close-height + $modal-header-padding-y;
  `,
  // Offcanvas styles
  '.offcanvas-header .btn-close': css`
    padding: $offcanvas-padding-y * 0.5 $offcanvas-padding-x * 0.5;
    margin-top: -0.5 * $offcanvas-padding-y;
    margin-right: -0.5 * $offcanvas-padding-x;
    margin-bottom: -0.5 * $offcanvas-padding-y;

    // Workaround for missing box-sizing in react native.
    width: $btn-close-width + $offcanvas-padding-x;
    height: $btn-close-height + $offcanvas-padding-y;
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

  const modal = useContext(ModalContext);
  const offcanvas = useContext(OffcanvasContext);

  const classes = getStyles(styles, [
    '.btn-close',
    disabled && '.btn-close-disabled',
    // Modal styles
    modal && '.modal-header .btn-close',
    // Offcanvas styles
    offcanvas && '.offcanvas-header .btn-close',
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
