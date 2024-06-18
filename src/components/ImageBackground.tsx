import React from 'react';
import {
  ImageBackground as BaseImageBackground,
  ImageBackgroundProps as BaseImageBackgroundProps,
} from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';
import type { ViewStyle, ImageStyle, StyleName } from '../types';

interface ImageBackgroundProps
  extends Omit<BaseImageBackgroundProps, 'style' | 'imageStyle'> {
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  styleName?: StyleName;
}

const ImageBackground = React.forwardRef<
  BaseImageBackground,
  ImageBackgroundProps
>((props, ref) => {
  const { style, imageStyle, styleName, ...elementProps } = props;

  const media = useMedia();
  const resolveStyle = useStyle(style, styleName);
  const resolveImageStyle = useStyle(imageStyle);

  return (
    <BaseImageBackground
      {...elementProps}
      ref={ref}
      style={resolveStyle({ media })}
      imageStyle={resolveImageStyle({ media })}
    />
  );
});

ImageBackground.displayName = 'ImageBackground';

export default ImageBackground;
