import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Text as BaseText } from 'react-native';
import useElementState from '../hooks/useElementState';
import TextStyleContext from '../style/TextStyleContext';
import useStyleName from '../hooks/useStyleName';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

function Text({ style, styleName, ...props }) {
  const state = useElementState();
  const textStyle = useContext(TextStyleContext);
  const utilitiesStyles = useStyleName(styleName);

  return (
    <BaseText
      {...props}
      style={[
        textStyle,
        utilitiesStyles,
        typeof style === 'function' ? style(state) : style,
      ]}
    />
  );
}

Text.propTypes = propTypes;

export default Text;
