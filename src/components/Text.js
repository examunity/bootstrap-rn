import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Text as BaseText } from 'react-native';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import useMedia from '../hooks/useMedia';
import TextStyleContext from '../style/TextStyleContext';
import { getStyles } from '../utils';
import useStyle from '../hooks/useStyle';

const propTypes = {
  small: PropTypes.bool,
  mark: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

const styles = StyleSheet.create({
  text: css`
    font-family: $font-family-base;
    font-size: $font-size-base;
    font-weight: $font-weight-base;
    line-height: $font-size-base * $line-height-base;
    color: $body-color;
    text-align: $body-text-align;
  `,
  '.small': css`
    font-size: $small-font-size;
    line-height: $small-font-size * $line-height-base;
  `,
  '.mark': css`
    padding: $mark-padding;
    background-color: $mark-bg;
  `,
});

const Text = React.forwardRef((props, ref) => {
  const {
    mark = false,
    small = false,
    style,
    styleName,
    ...elementProps
  } = props;

  const media = useMedia();
  const context = useContext(TextStyleContext);

  const classes = getStyles(styles, [small && '.small', mark && '.mark']);

  const resolveStyle = useStyle(
    [
      // eslint-disable-next-line react/destructuring-assignment
      (!context || !context.hasTextAncestor) && styles.text,
      // eslint-disable-next-line react/destructuring-assignment
      context && context.style,
      classes,
      style,
    ],
    styleName,
  );

  const element = (
    <BaseText {...elementProps} ref={ref} style={resolveStyle({ media })} />
  );

  // eslint-disable-next-line react/destructuring-assignment
  if (context && context.hasTextAncestor && !context.style) {
    return element;
  }

  // If we are not in an ancestor context yet, we need to set hasTextAncestor
  // to true for nested text components. Furthermore we need to reset the
  // context style, because we only need to apply the style once.
  return (
    <TextStyleContext.Provider
      value={{
        style: null,
        hasTextAncestor: true,
      }}
    >
      {element}
    </TextStyleContext.Provider>
  );
});

Text.displayName = 'Text';
Text.propTypes = propTypes;

export default Text;
