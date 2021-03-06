import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles, makeListChildren } from '../../utils';
import ListGroupContext from './ListGroupContext';
import ListGroupItem from './ListGroupItem';
import ListGroupItemAction from './ListGroupItemAction';

const propTypes = {
  children: PropTypes.node.isRequired,
  flush: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.list-group': css`
    display: flex;
    flex-direction: column;

    // No need to set list-style: none; since .list-group-item is block level
    padding-left: 0; // reset padding because ul and ol
    margin-bottom: 0;
    border-radius: $list-group-border-radius;
  `,
  '.list-group-flush': css`
    border-radius: 0;
  `,
});

const ListGroup = React.forwardRef((props, ref) => {
  const { children, flush, style, ...elementProps } = props;

  const classes = getStyles(styles, [
    '.list-group',
    flush && '.list-group-flush',
  ]);

  // TODO: Implement TabContext
  const tabbable = false;

  return (
    <View
      {...elementProps}
      ref={ref}
      accessibilityRole={tabbable ? 'tablist' : null}
      style={[classes, style]}
    >
      <ListGroupContext.Provider value={{ flush }}>
        {makeListChildren(children)}
      </ListGroupContext.Provider>
    </View>
  );
});

ListGroup.displayName = 'ListGroup';
ListGroup.propTypes = propTypes;

ListGroup.Item = ListGroupItem;
ListGroup.ItemAction = ListGroupItemAction;

export default ListGroup;
