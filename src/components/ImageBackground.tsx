import React from 'react';
import {
  ImageBackground as BaseImageBackground,
  ImageBackgroundProps as BaseImageBackgroundProps,
} from 'react-native';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';

export type ImageBackgroundProps = {
  style?: React.CSSProperties;
  styleName?: unknown;
} & Omit<BaseImageBackgroundProps, 'style'>;

const ImageBackground = React.forwardRef<
  BaseImageBackground,
  ImageBackgroundProps
>((props, ref) => {
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

export default ImageBackground;
