import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Heading from '../Heading';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.offcanvas-title': css`
    margin-bottom: 0;
    line-height: $font-size-base * $offcanvas-title-line-height;
  `,
});

const OffcanvasTitle = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.offcanvas-title']);

  return (
    <Heading size={5} {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </Heading>
  );
});

OffcanvasTitle.displayName = 'OffcanvasTitle';
OffcanvasTitle.propTypes = propTypes;

export default OffcanvasTitle;
