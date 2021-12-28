import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView as BaseScrollView } from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

const ScrollView = React.forwardRef((props, ref) => {
  const { style, styleName, ...elementProps } = props;

  const media = useMedia();
  const resolveStyle = useStyle(style, styleName);

  return (
    <BaseScrollView
      {...elementProps}
      ref={ref}
      style={resolveStyle({ media })}
    />
  );
});

ScrollView.displayName = 'ScrollView';
ScrollView.propTypes = propTypes;

export default ScrollView;
