import React from 'react';
import PropTypes from 'prop-types';
import { View as BaseView } from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

const View = React.forwardRef((props, ref) => {
  const { style, styleName, ...elementProps } = props;
  const media = useMedia();
  const resolveStyle = useStyle(style, styleName);

  return (
    <BaseView {...elementProps} ref={ref} style={resolveStyle({ media })} />
  );
});

View.displayName = 'View';
View.propTypes = propTypes;

export default View;
