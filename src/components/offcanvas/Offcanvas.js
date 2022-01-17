import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BaseModal } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import TextStyleProvider from '../../style/TextStyleProvider';
import ScrollView from '../ScrollView';
import View from '../View';
import OffcanvasHeader from './OffcanvasHeader';
import OffcanvasTitle from './OffcanvasTitle';
import OffcanvasBody from './OffcanvasBody';

export const PLACEMENTS = ['top', 'bottom', 'start', 'end']; // , 'auto'

const propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  placement: PropTypes.oneOf(PLACEMENTS),
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
  onToggle: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.offcanvas': css`
    position: absolute; // fixed;
    bottom: 0;
    z-index: $zindex-offcanvas;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    // visibility: hidden;
    background-color: $offcanvas-bg-color;
    // background-clip: padding-box;
    @include platform(web) {
      outline-width: 0; // outline: 0;
    }
    // @include box-shadow($offcanvas-box-shadow);
    // @include transition(transform $offcanvas-transition-duration ease-in-out);
  `,
  '.offcanvas-text': css`
    color: $offcanvas-color;
  `,
  '.offcanvas-backdrop': css`
    position: absolute;
    top: 0;
    left: 0;
    z-index: $zindex-offcanvas-backdrop;
    width: 100%;
    height: 100%;
    background-color: $offcanvas-backdrop-bg;
    opacity: $offcanvas-backdrop-opacity;
  `,
  '.offcanvas-start': css`
    top: 0;
    left: 0;
    width: $offcanvas-horizontal-width;
    border-right-width: $offcanvas-border-width;
    border-style: solid;
    border-color: $offcanvas-border-color;
    // transform: translateX(-100%);
  `,
  '.offcanvas-end': css`
    top: 0;
    right: 0;
    width: $offcanvas-horizontal-width;
    border-left-width: $offcanvas-border-width;
    border-style: solid;
    border-color: $offcanvas-border-color;
    // transform: translateX(100%);
  `,
  '.offcanvas-top': css`
    top: 0;
    right: 0;
    left: 0;
    height: $offcanvas-vertical-height;
    max-height: 100%;
    border-bottom-width: $offcanvas-border-width;
    border-style: solid;
    border-color: $offcanvas-border-color;
    // transform: translateY(-100%);
  `,
  '.offcanvas-bottom': css`
    right: 0;
    left: 0;
    height: $offcanvas-vertical-height;
    max-height: 100%;
    width: 100%;
    border-top-width: $offcanvas-border-width;
    border-style: solid;
    border-color: $offcanvas-border-color;
    // transform: translateY(100%);
  `,
});

const Offcanvas = React.forwardRef((props, ref) => {
  const {
    children,
    visible,
    placement = 'top',
    backdrop = true,
    onToggle,
    style,
    ...elementProps
  } = props;

  const backdropClasses = getStyles(styles, ['.offcanvas-backdrop']);
  const classes = getStyles(styles, ['.offcanvas', `.offcanvas-${placement}`]);
  const textClasses = getStyles(styles, ['.offcanvas-content-text']);

  return (
    <BaseModal transparent visible={visible} onRequestClose={onToggle}>
      {backdrop && <View style={backdropClasses} />}
      <ScrollView {...elementProps} ref={ref} style={[classes, style]}>
        <TextStyleProvider style={textClasses}>{children}</TextStyleProvider>
      </ScrollView>
    </BaseModal>
  );
});

Offcanvas.displayName = 'Offcanvas';
Offcanvas.propTypes = propTypes;

Offcanvas.Header = OffcanvasHeader;
Offcanvas.Title = OffcanvasTitle;
Offcanvas.Body = OffcanvasBody;

export default Offcanvas;
