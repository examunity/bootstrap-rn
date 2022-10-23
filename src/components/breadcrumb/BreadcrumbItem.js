import React from 'react';
import { I18nManager } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles, optional } from '../../utils';
import useForcedContext from '../../hooks/useForcedContext';
import ListContext from '../helpers/ListContext';
import View from '../View';
import Text from '../Text';

const propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  dividerStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.breadcrumb-item + .breadcrumb-item': css`
    flex-direction: row; // added for bootstrap-rn
    padding-left: $breadcrumb-item-padding-x;
  `,
  '.breadcrumb-item + .breadcrumb-item::before': css`
    // float: left; // Suppress inline spacings and underlining of the separator
    padding-right: $breadcrumb-item-padding-x;
    color: $breadcrumb-divider-color;
  `,
  '.breadcrumb-item.active --text': css`
    color: $breadcrumb-active-color;
  `,
});

const BreadcrumbItem = React.forwardRef((props, ref) => {
  const {
    children,
    active = false,
    style,
    dividerStyle,
    textStyle,
    ...elementProps
  } = props;

  const { first } = useForcedContext(ListContext);

  const classes = getStyles(styles, [
    !first && '.breadcrumb-item + .breadcrumb-item',
  ]);
  const textClasses = getStyles(styles, [
    active && '.breadcrumb-item.active --text',
  ]);
  const dividerClasses = getStyles(styles, [
    '.breadcrumb-item + .breadcrumb-item::before',
  ]);

  // composite component
  return (
    <View
      {...elementProps}
      ref={ref}
      {...optional(active, { accessibilityCurrent: 'page' })}
      style={[classes, style]}
      textStyle={[textClasses, textStyle]}
    >
      {!first && (
        <Text selectable={false} style={[dividerClasses, dividerStyle]}>
          {I18nManager.isRTL
            ? StyleSheet.value('breadcrumb-divider-flipped')
            : StyleSheet.value('breadcrumb-divider')}
        </Text>
      )}
      {children}
    </View>
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.propTypes = propTypes;

export default BreadcrumbItem;
