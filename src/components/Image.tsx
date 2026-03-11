import React from 'react';
import { Image as BaseImage, ImageProps as BaseImageProps } from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';
import type { ExtendedImageStyle, StyleProp, StyleName } from '../types';

export type ImageRef = BaseImage;

export interface ImageProps extends Omit<BaseImageProps, 'style'> {
  style?: StyleProp<ExtendedImageStyle>;
  styleName?: StyleName;
}

function Image(props: ImageProps & React.RefAttributes<ImageRef>) {
  const { ref, style, styleName, ...elementProps } = props;

  const media = useMedia();
  const resolveStyle = useStyle(style, styleName);

  return (
    <BaseImage
      {...elementProps}
      ref={ref}
      style={resolveStyle({ media }) as BaseImageProps['style']}
    />
  );
}

export default Image;
