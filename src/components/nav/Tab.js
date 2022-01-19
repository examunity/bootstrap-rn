import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.nav-tabs': css`
    border-bottom: $nav-tabs-border-width solid $nav-tabs-border-color;

    margin-bottom: -$nav-tabs-border-width;
    //background: none;
    border: $nav-tabs-border-width solid transparent;
    //@include border-top-radius($nav-tabs-border-radius);
  `,
});

const Tab = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.nav-tabs']);

  return (
    <View {...elementProps} ref={ref} style={[classes, style]}>
      {children}
    </View>
  );
});

Tab.displayName = 'Tab';
Tab.propTypes = propTypes;

export default Tab;
