import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import View from '../View';
import TextStyleProvider from '../../style/TextStyleProvider';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  '.dropdown-header': css`
    padding: $dropdown-header-padding;
    margin-bottom: 0; // for use with heading elements
    font-size: $font-size-sm;
    color: $dropdown-header-color;
    // white-space: nowrap; // as with > li > a
  `,
});

const DropdownHeader = (props) => {
  const { children } = props;
  const classes = getStyles(styles, ['.dropdown-header']);

  return (
    <View style={[classes]}>
      <TextStyleProvider>{children}</TextStyleProvider>
    </View>
  );
};

DropdownHeader.propTypes = propTypes;

export default DropdownHeader;
