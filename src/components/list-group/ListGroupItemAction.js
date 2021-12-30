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
    '.list-group-action': css`

    `,
});

function ListGroupItemAction(props) {
    const { children, style, ...elementProps } = props;
    const classes = getStyles(styles, ['.list-group-action']);

    return (
        <View style={[classes, style]} >
        </ View>
    );
}

ListGroupItemAction.displayName = 'ListGroupItemAction';
ListGroupItemAction.propTypes = propTypes;

export default ListGroupItemAction;

// TODO: ListGroupItemAction