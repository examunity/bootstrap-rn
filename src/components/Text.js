import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Text as BaseText } from 'react-native';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import useMedia from '../hooks/useMedia';
import TextStyleContext from '../style/TextStyleContext';
import { getStyles } from '../utils';
import useStyleName from '../hooks/useStyleName';

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
    line-height: $line-height-base;
    color: $body-color;
    text-align: $body-text-align;
  `,
  '.small': css`
    // font-size: $small-font-size;
  `,
  '.mark': css`
    padding: $mark-padding;
    background-color: $mark-bg;
  `,
});

function Text(props) {
  const {
    mark = false,
    small = false,
    style,
    styleName,
    ...elementProps
  } = props;

  const media = useMedia();
  const context = useContext(TextStyleContext);
  const utilitiesStyles = useStyleName(styleName);

  const classes = getStyles(styles, [small && '.small', mark && '.mark']);

  const element = (
    <BaseText
      {...elementProps}
      style={[
        // eslint-disable-next-line react/destructuring-assignment
        (!context || !context.hasTextAncestor) && styles.text,
        // eslint-disable-next-line react/destructuring-assignment
        context && context.style,
        classes,
        typeof style === 'function' ? style({ media }) : style,
        utilitiesStyles,
      ]}
    />
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
}

Text.propTypes = propTypes;

export default Text;
