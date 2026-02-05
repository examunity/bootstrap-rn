import React from 'react';
import { Platform } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';
import View, { ViewProps, ViewRef } from '../View';
import useForcedContext from '../../hooks/useForcedContext';
import ListContext from '../helpers/ListContext';

export interface PaginationItemProps extends ViewProps {
  active?: boolean;
  disabled?: boolean;
}

const styles = StyleSheet.create({
  '.pagination-item': css`
    padding-bottom: $pagination-padding-y;
    padding-top: $pagination-padding-y;
    padding-left: $pagination-padding-x;
    padding-right: $pagination-padding-x;
    border: $list-group-border-width solid $list-group-border-color;

    &:hover {
      color: $pagination-hover-color;
      background-color: $pagination-hover-bg;
      border-color: $pagination-hover-border-color;
    }

    &:focus {
      color: $pagination-focus-color;
      background-color: $pagination-focus-bg;
      // box-shadow: $pagination-focus-box-shadow;
      // outline: $pagination-focus-outline;
    }
  `,
  '.pagination-item:first-child': css`
    border-top-left-radius: $list-group-border-radius;
    border-bottom-left-radius: $list-group-border-radius;
  `,
  '.pagination-item:last-child': css`
    border-top-right-radius: $list-group-border-radius;
    border-bottom-right-radius: $list-group-border-radius;
  `,
  '.pagination-item.active': css`
    color: $pagination-active-color;
    background-color: $pagination-active-bg;
    border-color: $pagination-active-border-color;
  `,
  '.pagination-item.disabled': css`
    color: $pagination-disabled-color;
    background-color: $pagination-disabled-bg;
    border-color: $pagination-disabled-border-color;
  `,
});

const PaginationItem = React.forwardRef<ViewRef, PaginationItemProps>(
  (props, ref) => {
    const {
      children,
      active = false,
      disabled = false,
      style,
      textStyle,
      ...elementProps
    } = props;

    const { first, last } = useForcedContext(ListContext);

    const classes = getStyles(styles, [
      '.pagination-item',
      first && '.pagination-item:first-child',
      last && '.pagination-item:last-child',
      active && '.pagination-item.active',
      disabled && '.pagination-item.disabled',
    ]);

    const textClasses = getStyles(styles, [
      active && '.pagination-item.active',
      disabled && '.pagination-item.disabled',
    ]);

    const role = Platform.OS === 'web' ? 'listitem' : undefined;

    return (
      <View
        {...elementProps}
        ref={ref}
        role={role}
        style={[classes, style]}
        textStyle={[textClasses, textStyle]}
      >
        {children}
      </View>
    );
  },
);

PaginationItem.displayName = 'PaginationItem';

export default PaginationItem;

/*
$pagination-padding-y:              .375rem;
$pagination-padding-x:              .75rem;
$pagination-padding-y-sm:           .25rem;
$pagination-padding-x-sm:           .5rem;
$pagination-padding-y-lg:           .75rem;
$pagination-padding-x-lg:           1.5rem;

$pagination-color:                  $link-color;
$pagination-bg:                     $white;
$pagination-border-width:           $border-width;
$pagination-border-radius:          $border-radius;
$pagination-margin-start:           -$pagination-border-width;
$pagination-border-color:           $gray-300;

$pagination-focus-color:            $link-hover-color;
$pagination-focus-bg:               $gray-200;
$pagination-focus-box-shadow:       $input-btn-focus-box-shadow;
$pagination-focus-outline:          0;

$pagination-hover-color:            $link-hover-color;
$pagination-hover-bg:               $gray-200;
$pagination-hover-border-color:     $gray-300;

$pagination-active-color:           $component-active-color;
$pagination-active-bg:              $component-active-bg;
$pagination-active-border-color:    $pagination-active-bg;

$pagination-disabled-color:         $gray-600;
$pagination-disabled-bg:            $white;
$pagination-disabled-border-color:  $gray-300;

$pagination-transition:              color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;

$pagination-border-radius-sm:       $border-radius-sm;
$pagination-border-radius-lg:       $border-radius-lg;

*/
