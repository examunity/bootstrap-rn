import React, { useContext } from 'react';
import css from '../../style/css';
import { getStyles } from '../../utils';
import StyleSheet from '../../style/StyleSheet';
import Pressable, { PressableProps, PressableRef } from '../Pressable';
import ModalContext from '../modal/ModalContext';
import OffcanvasContext from '../offcanvas/OffcanvasContext';
import useMedia from '../../hooks/useMedia';
import useStyle from '../../hooks/useStyle';
import useInteractionState from '../../hooks/useInteractionState';
import useBackground from '../../hooks/useBackground';
import { escapeSvg } from '../../theme/functions';
import type { ThemeVariables } from '../../types';

export interface CloseButtonProps extends Omit<PressableProps, 'children'> {
  disabled?: boolean;
}

const styles = StyleSheet.create({
  '.btn-close': css`
    // Workaround for missing box-sizing in react native.
    $additional-width: $btn-close-padding-x * 2;
    $additional-height: $btn-close-padding-y * 2;

    // box-sizing: content-box;
    width: $btn-close-width + $additional-width;
    height: $btn-close-height + $additional-height;
    padding: $btn-close-padding-y $btn-close-padding-x;
    background-color: transparent; // include transparent for button elements
    background-image: ${(t: ThemeVariables) => escapeSvg(t['btn-close-bg'])};
    background-position: center;
    background-size: $btn-close-width auto;
    background-repeat: no-repeat;
    border-width: 0; // for button elements
    border-radius: $border-radius;
    opacity: $btn-close-opacity;

    &:hover {
      opacity: $btn-close-hover-opacity;
    }

    &:focus {
      @include platform(web) {
        outline-style: none; // outline: 0;
        box-shadow: $btn-close-focus-shadow;
      }
      opacity: $btn-close-focus-opacity;
    }
  `,
  '.btn-close --text': css`
    color: $btn-close-color;

    // Override <a>'s hover style
    &:hover {
      color: $btn-close-color;
      text-decoration: none;
    }
  `,
  '.btn-close.disabled': css`
    pointer-events: none;
    user-select: none;
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

const CloseButton = React.forwardRef<PressableRef, CloseButtonProps>(
  (props, ref) => {
    const {
      hitSlop = 12,
      disabled = false,
      style,
      textStyle,
      styleName,
      ...elementProps
    } = props;

    const media = useMedia();

    const modal = useContext(ModalContext);
    const offcanvas = useContext(OffcanvasContext);

    const classes = getStyles(styles, [
      '.btn-close',
      disabled && '.btn-close.disabled',
      // Modal styles
      modal && '.modal-header .btn-close',
      // Offcanvas styles
      offcanvas && '.offcanvas-header .btn-close',
    ]);
    const textClasses = getStyles(styles, ['.btn-close --text']);

    const resolveStyle = useStyle([classes, style], styleName);

    const { interaction, interactionProps } = useInteractionState(elementProps);

    const background = useBackground(
      resolveStyle({
        media,
        interaction,
      }),
    );

    return (
      <Pressable
        {...elementProps}
        {...interactionProps}
        ref={ref}
        hitSlop={hitSlop}
        disabled={disabled}
        style={background.style}
        textStyle={[textClasses, textStyle]}
      >
        {background.element}
      </Pressable>
    );
  },
);

CloseButton.displayName = 'CloseButton';

export default CloseButton;
