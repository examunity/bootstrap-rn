import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

function BsText({
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  body,
  small,
  size,
  color,
  bold,
  italic,
  center,
  children,
  ...rest
}) {
  return (
    <Text
      style={[
        h1 && { fontSize: 44 },
        h2 && { fontSize: 38 },
        h3 && { fontSize: 30 },
        h4 && { fontSize: 24 },
        h5 && { fontSize: 21 },
        h6 && { fontSize: 18 },
        p && { fontSize: 16 },
        body && { fontSize: 14 },
        small && { fontSize: 12 },
        size && { fontSize: size },
        color && { color },
        italic && { fontStyle: 'italic' },
        bold && { fontWeight: 'bold' },
        center && { textAlign: 'center' },
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

BsText.defaultProps = {
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  p: false,
  body: false,
  small: false,
  size: 0,
  color: null,
  muted: false,
  bold: false,
  center: false,
  italic: false,
};

BsText.propTypes = {
  children: PropTypes.node.isRequired,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  h6: PropTypes.bool,
  p: PropTypes.bool,
  body: PropTypes.bool,
  small: PropTypes.bool,
  size: PropTypes.number,
  color: PropTypes.string,
  muted: PropTypes.bool,
  bold: PropTypes.bool,
  center: PropTypes.bool,
  italic: PropTypes.bool,
};

export default BsText;
