import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Text as BaseText } from 'react-native';
import StyleSheet from '../style/StyleSheet';
import css from '../style/css';
import useMedia from '../hooks/useMedia';
import TextStyleContext from '../style/TextStyleContext';
import useStyleName from '../hooks/useStyleName';

const propTypes = {
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
});

function Text({ style, styleName, ...props }) {
  const media = useMedia();
  const textStyle = useContext(TextStyleContext);
  const utilitiesStyles = useStyleName(styleName);

  return (
    <BaseText
      {...props}
      style={[
        styles.text,
        textStyle,
        utilitiesStyles,
        typeof style === 'function' ? style({ media }) : style,
      ]}
    />
  );
}

Text.propTypes = propTypes;

export default Text;
