import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground as BaseImageBackground } from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

const ImageBackground = React.forwardRef((props, ref) => {
  const { style, styleName, ...elementProps } = props;

  const media = useMedia();
  const resolveStyle = useStyle(style, styleName);

  return (
    <BaseImageBackground
      {...elementProps}
      ref={ref}
      style={resolveStyle({ media })}
    />
  );
});

ImageBackground.displayName = 'ImageBackground';
ImageBackground.propTypes = propTypes;

export default ImageBackground;
