import React from 'react';
import PropTypes from 'prop-types';
import { BackgroundImage as BaseBackgroundImage } from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

const BackgroundImage = React.forwardRef((props, ref) => {
  const { style, styleName, ...elementProps } = props;

  const media = useMedia();
  const resolveStyle = useStyle(style, styleName);

  return (
    <BaseBackgroundImage
      {...elementProps}
      ref={ref}
      style={resolveStyle({ media })}
    />
  );
});

BackgroundImage.displayName = 'BackgroundImage';
BackgroundImage.propTypes = propTypes;

export default BackgroundImage;
