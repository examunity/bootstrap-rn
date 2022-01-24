import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import View from './View';
import { getStyles } from '../utils';

const propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  onToggle: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.collapse': css`
    // position: relative;
  `,
});

const Collapse = React.forwardRef((props, ref) => {
  const { children, visible, onToggle, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.collapse']);

  return (
    <>
      {visible && (
        <View {...elementProps} ref={ref} style={[classes, style]}>
          {children}
        </View>
      )}
    </>
  );
});

Collapse.displayName = 'Collapse';
Collapse.propTypes = propTypes;

export default Collapse;
