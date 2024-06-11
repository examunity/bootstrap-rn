import React from 'react';
import { Image as BaseImage, ImageProps as BaseImageProps } from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

export type ImageProps = {
  style?: React.CSSProperties;
  styleName?: unknown;
} & Omit<BaseImageProps, 'style'>;

const Image = React.forwardRef<BaseImage, ImageProps>((props, ref) => {
  const { style, styleName, ...elementProps } = props;

  const media = useMedia();
  const resolveStyle = useStyle(style, styleName);

  return (
    <BaseImage {...elementProps} ref={ref} style={resolveStyle({ media })} />
  );
});

Image.displayName = 'Image';

export default Image;
