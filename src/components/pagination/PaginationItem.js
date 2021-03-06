import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';
import View from '../View';

const propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

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
      //$pagination-focus-box-shadow:
      //$pagination-focus-outline:
    }
  `,

  '.pagination-item-first': css`
    border-top-left-radius: $list-group-border-radius;
    border-bottom-left-radius: $list-group-border-radius;
  `,
  '.pagination-item-last': css`
    border-top-right-radius: $list-group-border-radius;
    border-bottom-right-radius: $list-group-border-radius;
  `,

  '.pagination-item-active': css`
    color: $pagination-active-color;
    background-color: $pagination-active-bg;
    border-color: $pagination-active-border-color;
  `,
  '.pagination-item-disabled': css`
    color: $pagination-disabled-color;
    background-color: $pagination-disabled-bg;
    border-color: $pagination-disabled-border-color;
  `,
});

const PaginationItem = React.forwardRef((props, ref) => {
  const {
    children,
    first = false,
    last = false,
    active = false,
    disabled = false,
    style,
    textStyle,
    ...elementProps
  } = props;

  const classes = getStyles(styles, [
    '.pagination-item',
    first && '.pagination-item-first',
    last && '.pagination-item-last',
    active && '.pagination-item-active',
    disabled && '.pagination-item-disabled',
  ]);

  const textClasses = getStyles(styles, [
    active && '.pagination-item-active',
    disabled && '.pagination-item-disabled',
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

PaginationItem.displayName = 'PaginationItem';
PaginationItem.propTypes = propTypes;

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
