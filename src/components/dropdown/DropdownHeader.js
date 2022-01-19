import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import Heading from '../type/Heading';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.dropdown-header': css`
    // display: block;
    padding: $dropdown-header-padding;
    margin-bottom: 0; // for use with heading elements
    font-size: $font-size-sm;
    color: $dropdown-header-color;
    // white-space: nowrap; // as with > li > a
  `,
});

const DropdownHeader = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.dropdown-header']);

  return (
    <Heading {...elementProps} ref={ref} size={6} style={[classes, style]}>
      {children}
    </Heading>
  );
});

DropdownHeader.propTypes = propTypes;

export default DropdownHeader;
