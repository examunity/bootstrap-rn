import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';
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
      {children}
    </View>
  );
});

Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = propTypes;

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
