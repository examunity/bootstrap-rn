import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';
import View from '../View';
import useList from '../../hooks/useList';
import BreadcrumbItem from './BreadcrumbItem';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.breadcrumb': css`
    display: flex;
    flex-direction: row; // added for bootstrap-rn
    flex-wrap: wrap;
    padding: $breadcrumb-padding-y $breadcrumb-padding-x;
    margin-bottom: $breadcrumb-margin-bottom;
    // list-style: none;
    background-color: $breadcrumb-bg;
    border-radius: $breadcrumb-border-radius;
  `,
  '.breadcrumb --text': css`
    font-size: $breadcrumb-font-size;
    line-height: $breadcrumb-font-size * $line-height-base; // added for bootstrap-rn
  `,
});

const Breadcrumb = React.forwardRef((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const list = useList(children);

  const classes = getStyles(styles, ['.breadcrumb']);
  const textClasses = getStyles(styles, ['.breadcrumb --text']);

  const role = Platform.OS === 'web' ? 'list' : null;

  return (
    <View
      {...elementProps}
      ref={ref}
      accessibilityRole={role}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {list}
    </View>
  );
});

Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = propTypes;

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
