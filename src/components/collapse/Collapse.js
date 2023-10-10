import React from 'react';
import PropTypes from 'prop-types';
import View from '../View';
import useForcedContext from '../../hooks/useForcedContext';
import CollapseContext from './CollapseContext';
import CollapseProvider from './CollapseProvider';
import useToggleCollapse from './useToggleCollapse';

const propTypes = {
  children: PropTypes.node,
};

const Collapse = React.forwardRef((props, ref) => {
  const { children, ...elementProps } = props;

  const { identifier, visible } = useForcedContext(CollapseContext);

  if (!visible) {
    return null;
  }

  return (
    <View {...elementProps} ref={ref} id={identifier}>
      {children}
    </View>
  );
});

Collapse.displayName = 'Collapse';
Collapse.propTypes = propTypes;

Collapse.Provider = CollapseProvider;
Collapse.useToggle = useToggleCollapse;

export default Collapse;
