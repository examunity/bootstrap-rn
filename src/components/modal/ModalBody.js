import React from 'react';
import PropTypes from 'prop-types';
import css from '../../style/css';
import { getStyles } from '../../utils';
import useForcedContext from '../../hooks/useForcedContext';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';
import ScrollView from '../ScrollView';
import ModalContext from './ModalContext';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  innerStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.modal-body': css`
    position: relative;
    // Enable "flex-grow: 1" so that the body take up as much space as possible
    // when there should be a fixed height on ".modal-dialog".
    // Note from bootstrap-rn: Centered modals do not work with this style, but
    // everything just works fine without this style.
    // flex: 1 1 auto;
    padding: $modal-inner-padding;
  `,
});

const ModalBody = React.forwardRef((props, ref) => {
  const { children, style, innerStyle, ...elementProps } = props;

  const { scrollable } = useForcedContext(ModalContext);

  const classes = getStyles(styles, ['.modal-body']);

  const FlexView = scrollable ? ScrollView : View;

  return (
    <FlexView
      {...elementProps}
      ref={ref}
      style={scrollable ? style : [classes, style]}
      contentContainerStyle={scrollable ? [classes, innerStyle] : undefined}
    >
      {children}
    </FlexView>
  );
});

ModalBody.displayName = 'ModalBody';
ModalBody.propTypes = propTypes;

export default ModalBody;
