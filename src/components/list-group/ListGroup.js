import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';
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

const flattenChildren = (children, keyPrefix = '') => {
  const childrenArray = React.Children.toArray(children);

  return childrenArray.reduce((flatChildren, child) => {
    const newKey = `${keyPrefix}${child.key}`;

    if (child.type === React.Fragment) {
      return flatChildren.concat(flattenChildren(child.props.children, newKey));
    }

    if (React.isValidElement(child) && typeof child === 'object') {
      flatChildren.push(React.cloneElement(child, { key: newKey }));
    } else {
      flatChildren.push(child);
    }

    return flatChildren;
  }, []);
};

const ListGroup = React.forwardRef((props, ref) => {
  const { children, flush, style, ...elementProps } = props;

  const classes = getStyles(styles, [
    '.list-group',
    flush && '.list-group-flush',
  ]);

  // TODO: Implement TabContext
  const tabbable = false;

  const flattenedChildren = flattenChildren(children);

  return (
    <View
      {...elementProps}
      ref={ref}
      accessibilityRole={tabbable ? 'tablist' : null}
      style={[classes, style]}
    >
      <ListGroupContext.Provider value={{ flush }}>
        {React.Children.map(flattenedChildren, (child, index) => {
          const first = index === 0;
          const last = index === flattenedChildren.length - 1;

          return React.cloneElement(child, { first, last });
        })}
      </ListGroupContext.Provider>
    </View>
  );
});

ListGroup.displayName = 'ListGroup';
ListGroup.propTypes = propTypes;

ListGroup.Item = ListGroupItem;
ListGroup.ItemAction = ListGroupItemAction;

export default ListGroup;
