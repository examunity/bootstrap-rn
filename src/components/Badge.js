import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

// Testgebiet von Anton

function Badge({ h1, h2, ...rest }) {
  return (
    <View>
      <Text style={[h1 && { fontSize: 44 }, h2 && { fontSize: 38 }]} {...rest}>
        Badge Text
      </Text>
    </View>
  );
}

Badge.defaultProps = {
  h1: false,
  h2: false,
};

Badge.propTypes = { h1: PropTypes.bool, h2: PropTypes.bool };

export default Badge;
