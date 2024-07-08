import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Heading from '../Heading';
import { DISPLAY_FONT_SIZES } from '../../theme/proxies';
import { getStyles, each } from '../../utils';
import { TextProps, TextRef } from '../Text';

export interface DisplayHeadingProps extends TextProps {
  size: keyof typeof DISPLAY_FONT_SIZES;
}

const styles = StyleSheet.create({
  ...each(DISPLAY_FONT_SIZES, (size, value) => ({
    [`.display-${size}`]: css`
      font-size: ${value};
      line-height: ${value} * $headings-line-height;
    `,
  })),
});

const DisplayHeading = React.forwardRef<TextRef, DisplayHeadingProps>(
  (props, ref) => {
    const { children, size, style, ...elementProps } = props;

    const classes = getStyles(styles, [`.display-${size}`]);

    return (
      <Heading {...elementProps} ref={ref} size={1} style={[classes, style]}>
        {children}
      </Heading>
    );
  },
);

DisplayHeading.displayName = 'Heading';

export default DisplayHeading;
