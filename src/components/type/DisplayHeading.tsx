import React from 'react';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Heading from '../Heading';
import { DISPLAY_FONT_SIZES } from '../../theme/proxies';
import { getStyles, each } from '../../utils';

export type DisplayHeadingProps = {
  children: React.ReactNode;
  size: keyof typeof DISPLAY_FONT_SIZES;
  style?: React.CSSProperties;
};

const styles = StyleSheet.create({
  ...each(
    DISPLAY_FONT_SIZES,
    (size: keyof typeof DISPLAY_FONT_SIZES, value: string) => ({
      [`.display-${String(size)}`]: css`
        font-size: ${value};
        line-height: ${value} * $headings-line-height;
      `,
    }),
  ),
});

const DisplayHeading = React.forwardRef<ViewRef, DisplayHeadingProps>(
  (props, ref) => {
    const { children, size, style, ...elementProps } = props;

    const classes = getStyles(styles, [`.display-${String(size)}`]);

    return (
      <Heading {...elementProps} ref={ref} size={1} style={[classes, style]}>
        {children}
      </Heading>
    );
  },
);

DisplayHeading.displayName = 'Heading';

export default DisplayHeading;
