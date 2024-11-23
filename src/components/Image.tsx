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

const Image = React.forwardRef<ImageRef, ImageProps>((props, ref) => {
  const { style, styleName, ...elementProps } = props;

  const media = useMedia();
  const resolveStyle = useStyle(style, styleName);

  return (
    <BaseImage
      {...elementProps}
      ref={ref}
      style={resolveStyle({ media }) as BaseImageProps['style']}
    />
  );
});

Image.displayName = 'Image';

export default Image;
