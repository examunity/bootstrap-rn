import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BaseModal } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import TextStyleProvider from '../../style/TextStyleProvider';
import View from '../View';
import OffcanvasHeader from './OffcanvasHeader';
import OffcanvasTitle from './OffcanvasTitle';
import OffcanvasBody from './OffcanvasBody';

// PLACEMENTS
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
  '.offcanvas-start': css`
    top: 0;
    left: 0;
    height: 100%;
    padding-top: 1.5rem;
    padding-right: 1.5rem;
    width: $offcanvas-horizontal-width;
    // border-right: $offcanvas-border-width solid $offcanvas-border-color;
    // transform: translateX(-100%);
  `,
  '.offcanvas-end': css`
    align-self: flex-end;
    height: 100%;
    padding-top: 1.5rem;
    padding-left: 1.5rem;
    width: $offcanvas-horizontal-width;
    // border-left: $offcanvas-border-width solid $offcanvas-border-color;
    // transform: translateX(100%);
  `,
  '.offcanvas-top': css`
    width: 100%;
    min-height: $offcanvas-vertical-height;
    max-height: 100%;
    padding-top: 1.5rem;
    // border-bottom: $offcanvas-border-width solid $offcanvas-border-color;
    // transform: translateY(-100%);
  `,
  '.offcanvas-bottom': css`
    margin-top: auto;
    min-height: $offcanvas-vertical-height;
    max-height: 100%;
    width: 100%;
    // border-top: $offcanvas-border-width solid $offcanvas-border-color;
    // transform: translateY(100%);
  `,

  '.offcanvas-content-text': css`
    color: $modal-content-color;
  `,

  '.offcanvas': css`
    z-index: $zindex-offcanvas;
    display: flex;
    flex-grow: 1;
  `,

  '.offcanvas-content': css`
    flex-direction: column;
    color: $offcanvas-color;
    background-color: $offcanvas-bg-color;
  `,

  '.offcanvas-backdrop': css`
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    margin: 0;
    z-index: $zindex-offcanvas-backdrop;
    width: 100%;
    height: 100%;
    background-color: $modal-backdrop-bg;
    opacity: $modal-backdrop-opacity;
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

  const offcanvasBackdropClasses = getStyles(styles, ['.offcanvas-backdrop']);
  const offcanvasClasses = getStyles(styles, ['.offcanvas']);
  const offcanvasContentClasses = getStyles(styles, [
    '.offcanvas-content',
    `.offcanvas-${placement}`,
  ]);
  const offcanvasContentTextClasses = getStyles(styles, [
    '.offcanvas-content-text',
  ]);

  return (
    <BaseModal transparent visible={visible} onRequestClose={() => {}}>
      {backdrop && <View style={offcanvasBackdropClasses} />}
      <View style={offcanvasClasses}>
        <View
          {...elementProps}
          ref={ref}
          style={[offcanvasContentClasses, style]}
        >
          <TextStyleProvider style={offcanvasContentTextClasses}>
            {children}
          </TextStyleProvider>
        </View>
      </View>
    </BaseModal>
  );
});

Offcanvas.displayName = 'Offcanvas';
Offcanvas.propTypes = propTypes;

Offcanvas.Header = OffcanvasHeader;
Offcanvas.Title = OffcanvasTitle;
Offcanvas.Body = OffcanvasBody;

export default Offcanvas;
