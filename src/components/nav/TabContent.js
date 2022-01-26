import React from 'react';
import PropTypes from 'prop-types';
import View from '../View';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const TabContent = React.forwardRef((props, ref) => {
  const { ...elementProps } = props;

  return <View {...elementProps} ref={ref} />;
});

TabContent.displayName = 'TabContent';
TabContent.propTypes = propTypes;

export default TabContent;
