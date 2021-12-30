import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';
import { Text, View } from 'react-native';

const propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.any,
};

const styles = StyleSheet.create({
    '.list-group-item': css`
    position: relative;
    display: block;
    padding: $list-group-item-padding-y $list-group-item-padding-x;
    color: $list-group-color;
    // text-decoration: if($link-decoration == none, null, none);
    background-color: $list-group-bg;
    border: $list-group-border-width solid $list-group-border-color;
    `,
});

const ListGroupItem = React.forwardRef((props, ref) => {
    const { children, style, ...elementProps } = props;
    const classes = getStyles(styles, ['.list-group-item']);
    return (
        <Text style={[classes, style]}>{children}</Text>
    );
});

ListGroupItem.displayName = 'ListGroupItem';
ListGroupItem.propTypes = propTypes;

export default ListGroupItem;
