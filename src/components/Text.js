import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Text as BaseText } from 'react-native';
import TextStyleContext from '../style/TextStyleContext';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

function Text({ style, ...props }) {
  const textStyle = useContext(TextStyleContext);

  return <BaseText {...props} style={[textStyle, style]} />;
}

Text.propTypes = propTypes;

export default Text;
