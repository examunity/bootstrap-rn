import React from 'react';
import { Platform } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';
import useList from '../../hooks/useList';
import View from '../View';
import PaginationItem from './PaginationItem';

export type PaginationProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const styles = StyleSheet.create({
  '.pagination': css`
    background-color: $white;
    flex-direction: row;
  `,
});

const Pagination = React.forwardRef<ViewRef, PaginationProps>((props, ref) => {
  const { children, style, ...elementProps } = props;

  const list = useList(children);

  const classes = getStyles(styles, ['.pagination']);

  const role = Platform.OS === 'web' ? 'list' : undefined;

  return (
    <View {...elementProps} ref={ref} role={role} style={[classes, style]}>
      {list}
    </View>
  );
});

Pagination.displayName = 'Pagination';

export default Object.assign(Pagination, {
  Item: PaginationItem,
});
