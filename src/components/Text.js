import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Text as BaseText } from 'react-native';
import StyleSheet from '../style/StyleSheet';
import useMedia from '../hooks/useMedia';
import TextStyleContext from '../style/TextStyleContext';
import useStyleName from '../hooks/useStyleName';
import v from '../theme/variables';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

const styles = StyleSheet.create({
  text: {
    fontFamily: v.fontFamilyBase,
    fontSize: v.fontSizeBase,
    fontWeight: v.fontWeightBase,
    lineHeight: v.lineHeightBase,
    color: v.bodyColor,
    textAlign: v.bodyTextAlign,
  },
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
