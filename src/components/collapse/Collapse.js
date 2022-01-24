import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import View from '../View';
import { getStyles } from '../../utils';
import useForcedContext from '../../hooks/useForcedContext';
import CollapseContext from './CollapseContext';
import CollapseProvider from './CollapseProvider';

const propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.collapse': css`
    display: none;
  `,
});

const Collapse = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const collapse = useForcedContext(CollapseContext);

  const { identifier, visible } = collapse;

  if (!visible) {
    return null;
  }

  const classes = getStyles(styles, [!collapse.visible && '.collapse']);

  return (
    <View
      {...elementProps}
      ref={ref}
      accessibilityLabelledBy={identifier}
      style={[classes, style]}
    >
      {children}
    </View>
  );
});

Collapse.displayName = 'Collapse';
Collapse.propTypes = propTypes;

Collapse.Context = CollapseContext;
Collapse.Provider = CollapseProvider;

export default Collapse;
