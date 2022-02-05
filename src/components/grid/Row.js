import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  rows: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.row': css`
    display: flex;
    flex-direction: row; // added for bootstrap-native
    flex-wrap: wrap;
    margin-top: 0;
    margin-right: -0.5 * $grid-gutter-width;
    margin-left: -0.5 * $grid-gutter-width;
  `,
});

const Row = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.row']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </View>
  );
});

Row.displayName = 'Row';
Row.propTypes = propTypes;

export default Row;
