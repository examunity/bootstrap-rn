import React from 'react';
import { Platform } from 'react-native';
import View, { ViewProps, ViewRef } from '../View';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';
import useList from '../../hooks/useList';
import BreadcrumbItem from './BreadcrumbItem';

export interface BreadcrumbProps extends ViewProps {}

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

const Breadcrumb = React.forwardRef<ViewRef, BreadcrumbProps>((props, ref) => {
  const { children, style, textStyle, ...elementProps } = props;

  const list = useList(children);

  const classes = getStyles(styles, ['.breadcrumb']);
  const textClasses = getStyles(styles, ['.breadcrumb --text']);

  const role = Platform.OS === 'web' ? 'list' : undefined;

  return (
    <View
      {...elementProps}
      ref={ref}
      role={role}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {list}
    </View>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

export default Object.assign(Breadcrumb, {
  Item: BreadcrumbItem,
});
