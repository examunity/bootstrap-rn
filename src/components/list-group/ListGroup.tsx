import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import type { Role } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';
import useList from '../../hooks/useList';
import ListGroupContext from './ListGroupContext';
import ListGroupItem from './ListGroupItem';
import ListGroupItemAction from './ListGroupItemAction';

export type ListGroupProps = {
  children: React.ReactNode;
  flush?: boolean;
  style?: React.CSSProperties;
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

const getRole = (tabbable: boolean): Role | undefined => {
  if (tabbable) {
    return 'tablist';
  }

  if (Platform.OS === 'web') {
    return 'list';
  }

  return undefined;
};

const ListGroup = React.forwardRef<ViewRef, ListGroupProps>((props, ref) => {
  const { children, flush, style, ...elementProps } = props;

  const list = useList(children);

  const classes = getStyles(styles, [
    '.list-group',
    flush && '.list-group-flush',
  ]);

  // TODO: Implement TabContext
  const tabbable = false;

  const contextValue = useMemo(() => ({ flush }), [flush]);

  return (
    <View
      {...elementProps}
      ref={ref}
      role={getRole(tabbable)}
      style={[classes, style]}
    >
      <ListGroupContext.Provider value={contextValue}>
        {list}
      </ListGroupContext.Provider>
    </View>
  );
});

ListGroup.displayName = 'ListGroup';

export default Object.assign(ListGroup, {
  Item: ListGroupItem,
  ItemAction: ListGroupItemAction,
});
