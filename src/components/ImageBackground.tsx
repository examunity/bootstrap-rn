import React from 'react';
import {
  ImageBackground as BaseImageBackground,
  ImageBackgroundProps as BaseImageBackgroundProps,
} from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';
import type {
  ExtendedViewStyle,
  ExtendedImageStyle,
  StyleProp,
  StyleName,
} from '../types';

export type ImageBackgroundRef = BaseImageBackground;

export interface ImageBackgroundProps
  extends Omit<BaseImageBackgroundProps, 'style' | 'imageStyle'> {
  style?: StyleProp<ExtendedViewStyle>;
  imageStyle?: StyleProp<ExtendedImageStyle>;
  styleName?: StyleName;
}

const ImageBackground = React.forwardRef<
  ImageBackgroundRef,
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
