import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import View from '../View';
import Heading from '../Heading';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.dropdown-header': css`
    // display: block;
    padding: $dropdown-header-padding;
  `,
  '.dropdown-header --text': css`
    margin-bottom: 0; // for use with heading elements
    font-size: $font-size-sm;
    color: $dropdown-header-color;
    // white-space: nowrap; // as with > li > a
  `,
});

const DropdownHeader = React.forwardRef((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.dropdown-header']);
  const textClasses = getStyles(styles, ['.dropdown-header --text']);

  // composite component
  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      <Heading size={6} style={[textClasses, textStyle]}>
        {children}
      </Heading>
    </View>
  );
});

DropdownHeader.displayName = 'DropdownHeader';
DropdownHeader.propTypes = propTypes;

export default DropdownHeader;
