import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';
import View from '../View';

const propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.breadcrumb-item': css`
    padding-left: $breadcrumb-item-padding-x;
    padding-right: $breadcrumb-item-padding-x;
  `,
  '.breadcrumb --text': css`
    color: $primary;
  `,
  '.breadcrumb-item.active --text': css`
    color: $breadcrumb-active-color;
  `,
});

const BreadcrumbItem = React.forwardRef((props, ref) => {
  const { children, active = false, style, textStyle, ...elementProps } = props;

  const classes = getStyles(styles, ['.breadcrumb-item']);

  const textClasses = getStyles(styles, [
    '.breadcrumb --text',
    active && '.breadcrumb-item.active --text',
  ]);

  return (
    <View
      {...elementProps}
      ref={ref}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {children}
    </View>
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.propTypes = propTypes;

export default BreadcrumbItem;
