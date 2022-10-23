import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles } from '../../utils';
import useList from '../../hooks/useList';
import View from '../View';
import PaginationItem from './PaginationItem';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.pagination': css`
    background-color: $white;
    flex-direction: row;
  `,
});

const Pagination = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const list = useList(children);

  const classes = getStyles(styles, ['.pagination']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {list}
    </View>
  );
});

Pagination.displayName = 'Pagination';
Pagination.propTypes = propTypes;

Pagination.Item = PaginationItem;

export default Pagination;
