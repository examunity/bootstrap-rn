import React from 'react';
import PropTypes from 'prop-types';
import css from '../../style/css';
import { getStyles } from '../../utils';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.offcanvas-body': css`
    flex-grow: 1;
    padding: $offcanvas-padding-y $offcanvas-padding-x;
    // overflow-y: auto;
  `,
});

const OffcanvasBody = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.offcanvas-body']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </View>
  );
});

OffcanvasBody.propTypes = propTypes;

export default OffcanvasBody;
