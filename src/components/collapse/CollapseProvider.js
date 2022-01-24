import React from 'react';
import PropTypes from 'prop-types';
import CollapseContext from './CollapseContext';
import useCollapse from './useCollapse';
import toggle from './toggle';

const propTypes = {
  children: PropTypes.node.isRequired,
  defaultVisible: PropTypes.bool,
  visible: PropTypes.bool,
  onToggle: PropTypes.func,
};

const CollapseProvider = (props) => {
  const { children, defaultVisible = false, visible, onToggle } = props;

  const collapse = useCollapse(defaultVisible, visible, onToggle);

  return (
    <CollapseContext.Provider value={collapse}>
      {children}
    </CollapseContext.Provider>
  );
};

CollapseProvider.displayName = 'CollapseProvider';
CollapseProvider.propTypes = propTypes;

CollapseProvider.toggle = toggle;

export default CollapseProvider;
