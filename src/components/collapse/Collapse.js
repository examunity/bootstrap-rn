import React from 'react';
import PropTypes from 'prop-types';
import View from '../View';
import useForcedContext from '../../hooks/useForcedContext';
import CollapseContext from './CollapseContext';
import CollapseProvider from './CollapseProvider';
import toggle from './toggle';

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
    <View {...elementProps} ref={ref} nativeID={identifier}>
      {children}
    </View>
  );
});

Collapse.displayName = 'Collapse';
Collapse.propTypes = propTypes;

Collapse.Provider = CollapseProvider;
Collapse.toggle = toggle;

export default Collapse;
