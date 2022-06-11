import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles, makeListChildren } from '../../utils';
import View from '../View';
import BreadcrumbItem from './BreadcrumbItem';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.breadcrumb': css`
    flex-direction: row;
  `,
});

const Breadcrumb = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.breadcrumb']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {makeListChildren(children)}
    </View>
  );
});

Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = propTypes;

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;

/*
$breadcrumb-font-size:              null;
$breadcrumb-padding-y:              0;
$breadcrumb-padding-x:              0;
$breadcrumb-item-padding-x:         .5rem;
$breadcrumb-margin-bottom:          1rem;
$breadcrumb-bg:                     null;
$breadcrumb-divider-color:          $gray-600;
$breadcrumb-active-color:           $gray-600;
$breadcrumb-divider:                quote("/");
$breadcrumb-divider-flipped:        $breadcrumb-divider;
$breadcrumb-border-radius:          null;
*/
