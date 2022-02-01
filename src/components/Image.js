import React from 'react';
import PropTypes from 'prop-types';
import { Image as BaseImage } from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

const Image = React.forwardRef((props, ref) => {
  const { style, styleName, ...elementProps } = props;

  const media = useMedia();
  const resolveStyle = useStyle(style, styleName);

  return (
    <BaseImage {...elementProps} ref={ref} style={resolveStyle({ media })} />
  );
});

Image.displayName = 'Image';
Image.propTypes = propTypes;

export default Image;
