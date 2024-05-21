import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import { getStyles, transformPlacement } from '../../utils';
import css from '../../style/css';
import View from '../View';
import PopoverArrow from './PopoverArrow';
import PopoverHeader from './PopoverHeader';
import PopoverBody from './PopoverBody';
import PopoverContext from './PopoverContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.string,
  popper: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  arrowStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.popover': css`
    position: absolute;
    // top: 0;
    // left: 0 #{"/* rtl:ignore */"};
    z-index: $zindex-popover;
    // display: block;
    max-width: $popover-max-width;
    background-color: $popover-bg;
    // background-clip: padding-box;
    border: $popover-border-width solid $popover-border-color;
    border-radius: $popover-border-radius;
    // @include box-shadow($popover-box-shadow);
  `,
  '.popover --text': css`
    // Our parent element can be arbitrary since tooltips are by default inserted as a sibling of their target element.
    // So reset our font and text properties to avoid inheriting weird values.
    // @include reset-text();
    font-size: $popover-font-size;
    // Allow breaking very long words so they don't overflow the popover's bounds
    // word-wrap: break-word;
  `,
});

const Popover = React.forwardRef((props, ref) => {
  const {
    children,
    placement = 'right',
    popper,
    style,
    textStyle,
    arrowStyle,
    ...elementProps
  } = props;

  const popover = useMemo(
    () => ({
      placement: transformPlacement(placement),
      arrowStyle,
      popper,
    }),
    [arrowStyle],
  );

  const classes = getStyles(styles, ['.popover']);
  const textClasses = getStyles(styles, ['.popover --text']);

  // Accessiblity role tooltip is only supported on web.
  const role = Platform.OS === 'web' ? 'tooltip' : null;

  return (
    <View
      {...elementProps}
      ref={ref}
      role={role}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      <PopoverContext.Provider value={popover}>
        {children}
      </PopoverContext.Provider>
    </View>
  );
});

Popover.displayName = 'Popover';
Popover.propTypes = propTypes;

Popover.Arrow = PopoverArrow;
Popover.Header = PopoverHeader;
Popover.Body = PopoverBody;

export default Popover;
